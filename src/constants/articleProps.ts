//конфигурация для системы настройки внешнего вида статьи

//возможные варианты шрифтов для статьи
export const fontFamilyClasses = [
	'open-sans',
	'ubuntu',
	'cormorant-garamond',
	'days-one',
	'merriweather',
] as const; //указание, что это кортеж с неизменяемыми значениями

//(typeof fontFamilyClasses)[number] создает union тип из всех элементов массива
//Получается тип: 'open-sans' | 'ubuntu' | 'cormorant-garamond' | 'days-one' | 'merriweather'
export type FontFamiliesClasses = (typeof fontFamilyClasses)[number];

//Это универсальный тип для всех вариантов выборав форме (шрифт, цвет и т.д.)
export type OptionType = {
	title: string; // Отображаемое название
	value: string; // Значение для логики
	className: string; // CSS-класс для применения стиля
	optionClassName?: string; // CSS-класс для отображения в селекте
};

//варианты выбора шрифтов с соответствующими классами для визуального отображения
export const fontFamilyOptions: OptionType[] & {
	optionClassName?: FontFamiliesClasses;
} = [
	{ title: 'Open Sans', value: 'Open Sans', className: fontFamilyClasses[0] },
	{ title: 'Ubuntu', value: 'Ubuntu', className: fontFamilyClasses[1] },
	{
		title: 'Cormorant Garamond',
		value: 'Cormorant Garamond',
		className: fontFamilyClasses[2],
	},
	{ title: 'Days One', value: 'Days One', className: fontFamilyClasses[3] },
	{
		title: 'Merriweather',
		value: 'Merriweather',
		className: fontFamilyClasses[4],
	},
];

//варианты выбора цветов шрифта
export const fontColors: OptionType[] = [
	{
		title: 'Черный', //отображаемое название
		value: '#000000', //значение для логики
		className: 'font-black', //CSS-класс для применения стиля
		optionClassName: 'option-black', //для отображения в селекте(в выпадающем списке)
	},
	{
		title: 'Белый',
		value: '#FFFFFF',
		className: 'font-white',
		optionClassName: 'option-white',
	},
	{
		title: 'Серый',
		value: '#C4C4C4',
		className: 'font-gray',
		optionClassName: 'option-gray',
	},
	{
		title: 'Розовый',
		value: '#FEAFE8',
		className: 'font-pink',
		optionClassName: 'option-pink',
	},
	{
		title: 'Ярко-розовый',
		value: '#FD24AF',
		className: 'font-fuchsia',
		optionClassName: 'option-fuchsia',
	},
	{
		title: 'Жёлтый',
		value: '#FFC802',
		className: 'font-yellow',
		optionClassName: 'option-yellow',
	},
	{
		title: 'Зелёный',
		value: '#80D994',
		className: 'font-green',
		optionClassName: 'option-green',
	},
	{
		title: 'Голубой',
		value: '#6FC1FD',
		className: 'font-blue',
		optionClassName: 'option-blue',
	},
	{
		title: 'Фиолетовый',
		value: '#5F0DEE',
		className: 'font-purple',
		optionClassName: 'option-purple',
	},
];

//варианты выбора цветов фона статьи
export const backgroundColors: OptionType[] = [
	{
		title: 'Белый', //отображаемое название
		value: '#FFFFFF', //значение для логики
		className: 'bg-white', //CSS-класс для применения стиля
		optionClassName: 'option-white', //для отображения в селекте(в выпадающем списке)
	},
	{
		title: 'Черный',
		value: '#000000',
		className: 'bg-black',
		optionClassName: 'option-black',
	},
	{
		title: 'Серый',
		value: '#C4C4C4',
		className: 'bg-gray',
		optionClassName: 'option-gray',
	},
	{
		title: 'Розовый',
		value: '#FEAFE8',
		className: 'bg-pink',
		optionClassName: 'option-pink',
	},
	{
		title: 'Ярко-розовый',
		value: '#FD24AF',
		className: 'bg-fuchsia',
		optionClassName: 'option-fuchsia',
	},
	{
		title: 'Жёлтый',
		value: '#FFC802',
		className: 'bg-yellow',
		optionClassName: 'option-yellow',
	},
	{
		title: 'Зелёный',
		value: '#80D994',
		className: 'bg-green',
		optionClassName: 'option-green',
	},
	{
		title: 'Голубой',
		value: '#6FC1FD',
		className: 'bg-blue',
		optionClassName: 'option-blue',
	},
	{
		title: 'Фиолетовый',
		value: '#5F0DEE',
		className: 'bg-purple',
		optionClassName: 'option-purple',
	},
];

//варианты выбора ширины контента статьи
export const contentWidthArr: OptionType[] = [
	{
		title: 'Широкий', //отображаемое название
		value: '1394px', //Конкретное значение ширины
		className: 'width-wide', //CSS-класс для применения стиля (ширины)
		optionClassName: 'option-wide', //для отображения в селекте(в выпадающем списке)
	},
	{
		title: 'Узкий',
		value: '948px',
		className: 'width-narrow',
		optionClassName: 'option-narrow',
	},
];

//варианты выбора размера шрифта статьи
export const fontSizeOptions: OptionType[] = [
	{ title: '18px', value: '18px', className: 'font-size-18' },
	{ title: '25px', value: '25px', className: 'font-size-25' },
	{ title: '38px', value: '38px', className: 'font-size-38' },
];

//объект, содержащий начальные значения по умолчанию для всех параметров настройки статьи
export const defaultArticleState = {
	fontFamilyOption: fontFamilyOptions[0],
	fontColor: fontColors[0],
	backgroundColor: backgroundColors[0],
	contentWidth: contentWidthArr[0],
	fontSizeOption: fontSizeOptions[0],
};

//Тип для состояния статьи, основанный на структуре defaultArticleState
export type ArticleStateType = typeof defaultArticleState;
