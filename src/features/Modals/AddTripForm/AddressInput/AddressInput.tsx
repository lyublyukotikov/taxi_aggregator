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
  const [query, setQuery] = useState(field.value || ""); // Инициализируем с значением из Formik
  const [isSuggestionsVisible, setSuggestionsVisible] = useState(false);
  const [isError, setIsError] = useState(false); // Стейт для ошибки
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
          setIsError(false); // Сбрасываем ошибку при успешном запросе
        })
        .catch((error) => {
          console.error("Error fetching address suggestions:", error);
          setIsError(true); // Устанавливаем флаг ошибки, если запрос не удался
        });
    } else {
      setSuggestionsVisible(false);
    }
  }, [query, region, token]);

  const handleSuggestionClick = (value: string) => {
    setQuery(value);
    form.setFieldValue(field.name, value); // Передаем в Formik значение
    setSuggestions([]);
    setSuggestionsVisible(false);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
    form.setFieldValue(field.name, e.target.value); // Синхронизируем ввод с Formik
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
        onChange={handleInputChange}  // Обработчик для синхронизации с Formik
        placeholder="Введите адрес"
        ref={inputRef}
      />
      {isError && (
        <p className={styles.errorMessage}>Не удалось загрузить подсказки. Введите адрес вручную.</p>
      )}
      {isSuggestionsVisible && suggestions.length > 0 && !isError && (
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
