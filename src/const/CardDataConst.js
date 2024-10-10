import kyiv from '../assets/images/kyiv.png'
import lead from '../assets/images/lead.png'
import mountain from '../assets/images/mountain.png'
import sevastopol from '../assets/images/sevastopol.png'
import school from '../assets/images/school.png'
import university from '../assets/images/university.png'
import programming from '../assets/images/programming.png'

export const timeline = [
    {
        year: '2004',
        title: 'Корни',
        content: 'Я родилась в прекрасном городе Киев.',
        imageSrc: kyiv,
        imagePosition: 'right',
    },
    {
        year: '2010',
        title: 'Эверест',
        content: 'Уже в 3 года я покорила вершину эвереста.',
        imageSrc: mountain,
        imagePosition: 'left',
    },
    {
        year: '2014',
        title: 'Переезд',
        content: 'Переехали с семьей в Севастополь.',
        imageSrc: sevastopol,
        imagePosition: 'right',
    },
    {
        year: '2022',
        title: 'Школа',
        content: 'Закончила как-то 11 классов, поступила в СевГУ.',
        imageSrc: school,
        imagePosition: 'left',
    },
    {
        year: '2024',
        title: 'Добрый тимлид',
        content: 'Пожалел меня и взял на работу. Работаю FE.',
        imageSrc: lead,
        imagePosition: 'right',
    },
]

export const cardDataUniversity = [
    {
        title: 'Университет',
        content: 'ФГАОУ СевГУ',
        icon: university,
    },
    {
        title: 'Кафедра',
        content: '09 03 03 Прикладная информатика',
        icon: programming,
    },

]

export const interests = [
    {
        header: 'Мое хобби',
        content: 'Фотография: Люблю запечатлеть красоту природы и городской жизни. Программирование: Создаю небольшие проекты для развития навыков. Путешествия: Исследую новые места и культуры. Кулинария: Экспериментирую с рецептами со всего мира.',
        target: 'hobby'
    },
    {
        header: 'Мои любимые книги',
        content: 'Фантастика: "1984" Джордж Оруэлл, "Марсианин" Энди Вейер. Детективы: "Шерлок Холмс" Артур Конан Дойл. Классика: "Мастер и Маргарита" Михаил Булгаков.',
        target: 'books'
    },
    {
        header: 'Моя любимая музыка',
        content: 'Классическая музыка: Бетховен, Моцарт, Чайковский. Рок: Queen, The Beatles, Nirvana. Поп: Michael Jackson, Madonna, Lady Gaga. Электронная музыка: Daft Punk, Deadmau5.',
        target: 'music'
    },
    {
        header: 'Мои любимые фильмы',
        content: 'Интерстеллар: Научная фантастика о путешествиях во времени. Форрест Гамп: Трогательная история о простом человеке. Матрица: Культовый фильм о виртуальной реальности. Амели: Очаровательная французская комедия.',
        target: 'movies'
    }
]
