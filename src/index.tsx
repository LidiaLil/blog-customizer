import { createRoot } from 'react-dom/client';
import {
	StrictMode, //специальный режим React для выявления потенциальных проблем
	CSSProperties, //TypeScript тип для стилей React
	useState, //хук React для управления состоянием
} from 'react';
import clsx from 'clsx'; //Утилита для удобного объединения CSS классов

import { Article } from './components/article/Article';
import { ArticleParamsForm } from './components/article-params-form/ArticleParamsForm';
import { defaultArticleState, OptionType } from './constants/articleProps';

import './styles/index.scss';
import styles from './styles/index.module.scss';

//Создание корня приложения
const domNode = document.getElementById('root') as HTMLDivElement;
const root = createRoot(domNode);//Создает корневой элемент React для рендеринга

const App = () => {
	// Создаем состояние для формы
	const [currentFormState, setCurrentFormState] = useState(defaultArticleState);
	// Функция применения настроек
	const handleApply = (formData: typeof defaultArticleState) => {
		// console.log('Применяем настройки');
		setCurrentFormState(formData);
	};

	// Функция сброса настроек
	const handleReset = () => {
		// console.log('Сбрасываем настройки');
		setCurrentFormState(defaultArticleState);
	};
	// Функция изменения отдельного поля
	const handleChangeForm = (
		key: keyof typeof defaultArticleState,
		value: OptionType
	) => {
		// console.log('Изменяем');
		setCurrentFormState((prevState) => ({
			...prevState,
			[key]: value,
		}));
	};

	return (
		<main
			className={clsx(styles.main)}
			style={
				{
					'--font-family': currentFormState.fontFamilyOption.value,
					'--font-size': currentFormState.fontSizeOption.value,
					'--font-color': currentFormState.fontColor.value,
					'--container-width': currentFormState.contentWidth.value,
					'--bg-color': currentFormState.backgroundColor.value,
				} as CSSProperties
			}>
			{/* Использование компонента со ВСЕМИ пропсами */}
			<ArticleParamsForm
				formState={currentFormState}
				onApply={handleApply}
				onReset={handleReset}
				onChangeForm={handleChangeForm}
			/>
			<Article />
		</main>
	);
};

root.render(
	<StrictMode>
		<App />
	</StrictMode>
);
