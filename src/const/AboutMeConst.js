import kyiv from '../assets/images/kyiv.png'
import lead from '../assets/images/lead.png'
import mountain from '../assets/images/mountain.png'
import sevastopol from '../assets/images/sevastopol.png'
import school from '../assets/images/school.png'

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