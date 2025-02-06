import { useRef } from "react";
import { Formik, Form, ErrorMessage, Field } from "formik";
import { tripValidationSchema } from "@/utils/validationSchemas";
import ModalTemplate from "@/features/Modals/ModalTemplate/ModalTemplate";
import { RegionSelectionModalProps } from "@/models/RegionSelectionModalProps";
import styles from "./AddTripForm.module.scss";
import useOutsideClick from "@/hooks/useOutsideClick";
import { useAddTripMutation, useGetRegionsQuery } from "@/services/api";
import AddressInput from "./AddressInput/AddressInput";
import DynamicButton from "@/components/DynamicButton/DynamicButton";
import CustomSelect from "@/components/CustomSelect/CustomSelect";
import ErrorDisplay from "@/components/ErrorDisplay/ErrorDisplay";
import Spinner from "@/components/Spinner/Spinner";
import { TripCreate } from "@/models/Trip";

const AddTripForm: React.FC<RegionSelectionModalProps> = ({
  closeModalWindow,
}) => {
  const drawerRef = useRef<HTMLDivElement>(null);
  const [addTrip, { isLoading: isTripLoading, error: tripError }] =
    useAddTripMutation();
  const {
    data: regions,
    isLoading: isRegionsLoading,
    error: regionsError,
  } = useGetRegionsQuery();

  useOutsideClick(drawerRef, closeModalWindow);

  const handleSubmit = async (values: TripCreate) => {
    try {
      await addTrip({
        from: values.from,
        to: values.to,
        tariff: values.tariff,
        region: values.region,
      });
      closeModalWindow();
    } catch (error) {}
  };

  const regionOptions =
    regions?.map((region) => ({
      value: region.name,
      label: region.name,
    })) || [];

  return (
    <ModalTemplate closeModalWindow={closeModalWindow} drawerRef={drawerRef}>
      <div className={styles.addTripForm}>
        {isRegionsLoading && <Spinner />}
        {regionsError && <ErrorDisplay message="Ошибка загрузки регионов" />}

        {!isRegionsLoading && !regionsError && (
          <Formik
            initialValues={{ region: "", from: "", to: "", tariff: "Эконом" }}
            validationSchema={tripValidationSchema}
            onSubmit={handleSubmit}
          >
            {({ setFieldValue, values }) => (
              <Form className={styles.form}>
                <div className={styles.formGroup}>
                  <label htmlFor="region">Регион</label>
                  <CustomSelect
                    id="region"
                    value={values.region}
                    onChange={(e) => setFieldValue("region", e.target.value)}
                    options={[
                      { value: "", label: "Выберите регион" },
                      ...regionOptions,
                    ]}
                    label={""}
                    style={{ gap: "0px" }}
                  />
                  <ErrorMessage
                    name="region"
                    component="p"
                    className={styles.error}
                  />
                </div>

                <div className={styles.formGroup}>
                  <label htmlFor="tariff">Тариф</label>
                  <CustomSelect
                    id="tariff"
                    value={values.tariff}
                    onChange={(e) => setFieldValue("tariff", e.target.value)}
                    options={[
                      { value: "", label: "Выберите тариф" },
                      { value: "Эконом", label: "Эконом" },
                      { value: "Комфорт", label: "Комфорт" },
                      { value: "Бизнес", label: "Бизнес" },
                    ]}
                    label={""}
                    style={{ gap: "0px" }}
                  />
                  <ErrorMessage
                    name="tariff"
                    component="p"
                    className={styles.error}
                  />
                </div>

                <div className={styles.formGroup}>
                  <label htmlFor="from">Откуда</label>
                  <Field
                    component={AddressInput}
                    id="from"
                    name="from"
                    placeholder="Адрес отправления"
                    region={values.region} // Передаем выбранный регион
                    setFieldValue={setFieldValue} // Передаем setFieldValue
                  />
                  <ErrorMessage
                    name="from"
                    component="p"
                    className={styles.error}
                  />
                </div>

                <div className={styles.formGroup}>
                  <label htmlFor="to">Куда</label>
                  <Field
                    component={AddressInput}
                    id="to"
                    name="to"
                    placeholder="Адрес назначения"
                    region={values.region} // Передаем выбранный регион
                    setFieldValue={setFieldValue} // Передаем setFieldValue
                  />
                  <ErrorMessage
                    name="to"
                    component="p"
                    className={styles.error}
                  />
                </div>

                <div className={styles.formActions}>
                  <DynamicButton label={"Добавить"} type="submit" />
                  <DynamicButton label="Отменить" onClick={closeModalWindow} />
                </div>
              </Form>
            )}
          </Formik>
        )}

        {tripError && <ErrorDisplay message="Ошибка при добавлении поездки" />}
        {isTripLoading && <Spinner />}
      </div>
    </ModalTemplate>
  );
};

export default AddTripForm;
