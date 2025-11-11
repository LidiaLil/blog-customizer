// Компоненты формы параметров статьи
import { ArrowButton } from 'src/ui/arrow-button'; // кнопка открытия/закрытия панели
import { Button } from 'src/ui/button'; // кнопки формы
import { RadioGroup } from 'src/ui/radio-group'; // группа радио-кнопок
import { Select } from 'src/ui/select'; // выпадающий список
import { Separator } from 'src/ui/separator'; // разделитель
import { Text } from 'src/ui/text'; // текстовый элемент

import React, { useEffect, useRef, useState } from 'react';
import clsx from 'clsx'; // импорт clsx
import {
  defaultArticleState, // текущее состояние формы
  fontFamilyOptions, // варианты выбора шрифтов
  backgroundColors, // варианты выбора цветов фона
  contentWidthArr, // варианты выбора ширины контента статьи
  fontSizeOptions, // варианты выбора размера шрифта статьи
  fontColors, // варианты выбора цвета шрифта статьи
  OptionType, // тип для опций выбора
} from 'src/constants/articleProps';
import styles from './ArticleParamsForm.module.scss';

// пропсы компонента
type ArticleParamsFormProps = {
  formState: typeof defaultArticleState; // Текущее состояние формы
  onApply: (formState: typeof defaultArticleState) => void; // функция применения настроек
  onReset: () => void; // функция сброса настроек статьи
};

export function ArticleParamsForm(props: ArticleParamsFormProps) {
  const [isOpen, setIsOpen] = useState(false); // открытие/закрытие панели
  // Ссылка на DOM элемент сайдбара для обработки кликов вне области
  const sidebarRef = useRef<HTMLElement>(null);
  const {
    formState, // Текущее состояние статьи (уже примененные настройки)
    onApply, // Функция вызываемая при нажатии "Применить"
    onReset, // Функция вызываемая при нажатии "Сбросить"
  } = props; // деструктуризация пропсов

  // ЛОКАЛЬНОЕ состояние формы для временного хранения изменений
  // Пока пользователь не нажал "Применить", изменения сохраняются только здесь
  const [localFormState, setLocalFormState] = useState(formState);

  // Обновляем локальное состояние когда меняются пропсы или открывается сайдбар
  useEffect(() => {
    setLocalFormState(formState); // Обновляем локальное состояние при изменении пропсов
  }, [formState, isOpen]); // Зависимости: formState и isOpen

  // Функция для переключения состояния (открытия/закрытия) сайдбара
  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  // Функция для закрытия сайдбара
  const closeSidebar = () => {
    setIsOpen(false);
  };

  // Обработчик отправки формы (Применить)
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault(); // Предотвращаем перезагрузку страницы
    onApply(localFormState); // Вызываем функцию применения настроек
    closeSidebar(); // Закрываем сайдбар после применения
  };

  // Обработчик сброса формы
  const handleReset = () => {
    setLocalFormState(defaultArticleState); // Сбрасываем локальное состояние к default
    onReset(); // Вызываем функцию сброса настроек
  };

  // Универсальный обработчик изменения любого поля формы
  const handleChangeField = (
    key: keyof typeof defaultArticleState,
    value: OptionType,
  ) => {
    // Обновляем состояние, сохраняя предыдущие значения и изменяя только указанное поле
    setLocalFormState((prevState) => ({
      ...prevState, // Копируем все поля из предыдущего состояния
      [key]: value, // Обновляем только конкретное поле (key) новым значением (value)
    }));
  };

  // Закрытие при клике вне компонента
  // Эффект запускается при изменении isOpen
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      // Находим сайдбар по классу стилей
      const sidebar = document.querySelector(`.${styles.container}`);
      // Находим кнопку-стрелку по data-атрибуту
      const arrowButton = document.querySelector(
        '[data-testid="arrow-button"]',
      );

      /// / Проверяем условия для закрытия сайдбара:
      if (
        isOpen // если сайдбар открыт
				&& sidebar // если сайдбар существует в DOM
				&& !sidebar.contains(event.target as Node) // Клик был НЕ внутри сайдбара
				&& !arrowButton?.contains(event.target as Node) // и НЕ на кнопке-стрелке
      ) {
        closeSidebar(); // Закрываем сайдбар
      }
    };

    // Добавляем слушатель события клика по документу
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      // Удаляем слушатель при размонтировании компонента или изменении зависимостей
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen]); /// / Пересоздаем эффект при изменении isOpen

  return (
    <>
      {/* Кнопка-стрелка для открытия/закрытия сайдбара */}
      <ArrowButton isOpen={isOpen} onClick={toggleSidebar} />
      {/* Сайдбар с формой настроек */}
      <aside
        ref={sidebarRef}
        className={clsx(styles.container, {
				  [styles.container_open]: isOpen,
        })}
      >
        {/* Форма с обработчиками отправки и сброса */}
        <form
          className={styles.form}
          onSubmit={handleSubmit}
          onReset={handleReset}
        >
          {/* Заголовок формы */}
          <Text as="h2" size={31} weight={800} uppercase>
            Задайте параметры
          </Text>

          {/* СЕКЦИЯ: ШРИФТ */}
          <Select
            selected={localFormState.fontFamilyOption}
            options={fontFamilyOptions}
            onChange={(value) => handleChangeField('fontFamilyOption', value)} // Обработчик изменения
            title="Шрифт"
          />

          {/* СЕКЦИЯ: РАЗМЕР ШРИФТА */}
          <RadioGroup
            name="fontSize"
            selected={localFormState.fontSizeOption}
            options={fontSizeOptions}
            onChange={(value) => handleChangeField('fontSizeOption', value)}
            title="Размер шрифта"
          />

          {/* СЕКЦИЯ: ЦВЕТ ШРИФТА */}
          <Select
            selected={localFormState.fontColor}
            options={fontColors}
            onChange={(value) => handleChangeField('fontColor', value)}
            title="цвет шрифта"
          />

          <Separator />

          {/* СЕКЦИЯ: ЦВЕТ ФОНА */}
          <Select
            selected={localFormState.backgroundColor}
            options={backgroundColors}
            onChange={(value) => handleChangeField('backgroundColor', value)}
            title="цвет фона"
          />

          {/* СЕКЦИЯ: ШИРИНА КОНТЕНТА */}
          <Select
            selected={localFormState.contentWidth}
            options={contentWidthArr}
            onChange={(value) => handleChangeField('contentWidth', value)}
            title="Ширина контента"
          />

          {/* Кнопки внизу формы */}
          <div className={styles.bottomContainer}>
            <Button
              title="Сбросить"
              htmlType="reset"
              type="clear"
            />
            <Button
              title="Применить"
              htmlType="submit"
              type="apply"
            />
          </div>
        </form>
      </aside>
    </>
  );
}
