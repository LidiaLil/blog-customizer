// Компоненты формы параметров статьи
import { ArrowButton } from 'src/ui/arrow-button'; //кнопка открытия/закрытия панели
import { Button } from 'src/ui/button'; //кнопки формы
import { RadioGroup } from 'src/ui/radio-group'; //группа радио-кнопок
import { Select } from 'src/ui/select'; //выпадающий список
import { Separator } from 'src/ui/separator'; //разделитель
import { Text } from 'src/ui/text'; //текстовый элемент

import styles from './ArticleParamsForm.module.scss';
import React, { useEffect, useRef, useState } from 'react';
import clsx from 'clsx'; // импорт clsx
import {
	defaultArticleState, //текущее состояние формы
	fontFamilyOptions, //варианты выбора шрифтов
	backgroundColors, //варианты выбора цветов фона
	contentWidthArr, //варианты выбора ширины контента статьи
	fontSizeOptions, //варианты выбора размера шрифта статьи
	fontColors, //варианты выбора цвета шрифта статьи
	OptionType, //тип для опций выбора
} from 'src/constants/articleProps';

//пропсы компонента
type ArticleParamsFormProps = {
	formState: typeof defaultArticleState; // Текущее состояние формы
	onApply: (formState: typeof defaultArticleState) => void; //функция применения настроек
	onReset: () => void; //функция сброса настроек статьи
	onChangeForm: (
		key: keyof typeof defaultArticleState,
		value: OptionType
	) => void; //функция изменения состояния формы
	//keyof typeof defaultArticleState - получает все ключи этого типа
};

export const ArticleParamsForm = (props: ArticleParamsFormProps) => {
	const [isOpen, setIsOpen] = useState(false); //открытие/закрытие панели
	const sidebarRef = useRef<HTMLElement>(null); //ссылка на форму, чтобы отслеживать клики вне
	const {
		formState, //текущее состояние формы
		onApply, //функция применения настроек
		onReset, //функция сброса настроек статьи
		onChangeForm, //функция изменения состояния формы
	} = props; //деструктуризация пропсов

	// Функция для переключения состояния (открытия/закрытия) сайдбара
	const toggleSidebar = () => {
		setIsOpen(!isOpen);
	};

	// Функция для закрытия сайдбара
	const closeSidebar = () => {
		setIsOpen(false);
	};

	// Обработчик отправки формы
	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault(); // Предотвращаем перезагрузку страницы
		onApply(formState); // Вызываем функцию применения настроек
		closeSidebar(); // Закрываем сайдбар после применения
	};

	// Обработчик сброса формы
	const handleReset = () => {
		onReset(); // Вызываем функцию сброса настроек
	};

	// Закрытие при клике вне компонента
	// Эффект запускается при изменении isOpen
	useEffect(() => {
		const handleClickOutside = (event: MouseEvent) => {
			// Находим сайдбар по классу стилей
			const sidebar = document.querySelector(`.${styles.container}`);
			// Находим кнопку-стрелку по data-атрибуту
			const arrowButton = document.querySelector(
				'[data-testid="arrow-button"]'
			);

			//// Проверяем условия для закрытия сайдбара:
			if (
				isOpen && //если сайдбар открыт
				sidebar && // если сайдбар существует в DOM
				!sidebar.contains(event.target as Node) && // Клик был НЕ внутри сайдбара
				!arrowButton?.contains(event.target as Node) //и НЕ на кнопке-стрелке
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
	}, [isOpen]); //// Пересоздаем эффект при изменении isOpen

	return (
		<>
			{/* Передаем состояние и функцию в ArrowButton */}
			<ArrowButton isOpen={isOpen} onClick={toggleSidebar} />
			{/* Добавляем ref и условный класс */}
			<aside
				ref={sidebarRef}
				className={clsx(styles.container, {
					[styles.container_open]: isOpen,
				})}>
				{/* Добавляем обработчики onSubmit и onReset */}
				<form
					className={styles.form}
					onSubmit={handleSubmit}
					onReset={handleReset}>
					{/* Заголовок формы */}
					<Text as='h2' size={31} weight={800} uppercase>
						Задайте параметры
					</Text>

					{/* СЕКЦИЯ: ШРИФТ */}
					<Select
						selected={formState.fontFamilyOption}
						options={fontFamilyOptions}
						onChange={(value) => onChangeForm('fontFamilyOption', value)}
						title='Шрифт'
					/>

					{/* СЕКЦИЯ: РАЗМЕР ШРИФТА */}
					<RadioGroup
						name='fontSize'
						selected={formState.fontSizeOption}
						options={fontSizeOptions}
						onChange={(value) => onChangeForm('fontSizeOption', value)}
						title='Размер шрифта'
					/>

					{/* СЕКЦИЯ: ЦВЕТ ШРИФТА */}
					<Select
						selected={formState.fontColor}
						options={fontColors}
						onChange={(value) => onChangeForm('fontColor', value)}
						title='цвет шрифта'
					/>

					<Separator />

					{/* СЕКЦИЯ: ЦВЕТ ФОНА */}
					<Select
						selected={formState.backgroundColor}
						options={backgroundColors}
						onChange={(value) => onChangeForm('backgroundColor', value)}
						title='цвет фона'
					/>

					{/* СЕКЦИЯ: ШИРИНА КОНТЕНТА */}
					<Select
						selected={formState.contentWidth}
						options={contentWidthArr}
						onChange={(value) => onChangeForm('contentWidth', value)}
						title='Ширина контента'
					/>

					{/* Кнопки внизу формы */}
					<div className={styles.bottomContainer}>
						<Button
							title='Сбросить'
							htmlType='reset'
							type='clear'
							onClick={() => onReset()}
						/>
						<Button
							title='Применить'
							htmlType='submit'
							type='apply'
							onClick={() => onApply(formState)}
						/>
					</div>
				</form>
			</aside>
		</>
	);
};
