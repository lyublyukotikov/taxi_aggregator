import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import { AddressInputProps } from "@/models/AddressInputProps";
import { FieldProps } from "formik";
import styles from "./AddressInput.module.scss";
import { Suggestion } from "@/models/Suggestion";

const AddressInput: React.FC<AddressInputProps & FieldProps> = ({
  field,
  form,
  region,
  ...props
}) => {
  const [suggestions, setSuggestions] = useState<Suggestion[]>([]);
  const [query, setQuery] = useState("");
  const [isSuggestionsVisible, setSuggestionsVisible] = useState(false);
  const suggestionsRef = useRef<HTMLUListElement | null>(null);
  const inputRef = useRef<HTMLInputElement | null>(null);
  const token = import.meta.env.VITE_DADATA_TOKEN;  // Получаем токен

  useEffect(() => {
    if (query.length > 2) {
      axios
        .get("https://suggestions.dadata.ru/suggestions/api/4_1/rs/suggest/address", {
          params: { query, region },
          headers: {
            Authorization: `Token ${token}`,
            "Content-Type": "application/json",
          },
        })
        .then((response) => {
          setSuggestions(response.data.suggestions);
          setSuggestionsVisible(true);
        })
        .catch((error) => {
          console.error("Error fetching address suggestions:", error);
        });
    } else {
      setSuggestionsVisible(false);
    }
  }, [query, region, token]);

  const handleSuggestionClick = (value: string) => {
    setQuery(value);
    form.setFieldValue(field.name, value);
    setSuggestions([]);
    setSuggestionsVisible(false);
  };

  const handleClickOutside = (event: MouseEvent) => {
    if (
      inputRef.current &&
      !inputRef.current.contains(event.target as Node) &&
      suggestionsRef.current &&
      !suggestionsRef.current.contains(event.target as Node)
    ) {
      setSuggestions([]);
      setSuggestionsVisible(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className={styles.addressInputWrapper}>
      <input
        {...field}
        {...props}
        className={styles.input}
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Введите адрес"
        ref={inputRef}
      />
      {isSuggestionsVisible && suggestions.length > 0 && (
        <ul className={styles.suggestionsList} ref={suggestionsRef}>
          {suggestions.map((suggestion) => (
            <li
              key={suggestion.value}
              className={styles.suggestionItem}
              onClick={() => handleSuggestionClick(suggestion.value)}
            >
              {suggestion.value}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default AddressInput;
