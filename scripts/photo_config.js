//ПЕРЕСМОТРЕТЬ ДЛИНУ МАССИВОВ
//ПОУДАЛЯТЬ ШРИФТЫ
//НА ИЗМЕНЕНИЕ ШИРИНЫ ЭКРАНА КАК МИНИМУМ МЕНЯТЬ preShowConfig (чекнуть производительность сего маневра)
export const configAtr = { //amount photos in each folder
    // portfolio: 15,
    portfolio: 85,
    furniture: 43,
    jewerly: 62,
    prams: 42,
    technics: 43,
    clothes: 30,
};

export const photoOrder = {
    portfolio: {
        fourColumns: [55, 31, 34, 4, 46, 77, 53, 27, 68, 33, 57, 75, 3, 70, 84, 65, 24, 39, 48, 16, 28, 22, 44, 19, 17, 71, 50, 21, 79, 81, 38, 36, 9, 5, 29, 80, 58, 49, 52, 83, 60, 12, 59, 47, 15, 69, 82, 85, 7, 32, 78, 43, 64, 74, 8, 35, 72, 18, 11, 61, 63, 51, 2, 62, 37, 1, 54, 41, 67, 26, 40, 10, 66, 20, 23, 6, 45, 56, 76, 13, 42, 14, 25, 30],
        threeColumns: [24, 29, 26, 3, 41, 40, 17, 28, 35, 37, 38, 1, 19, 23, 16, 5, 39, 20, 31, 14, 21, 10, 11, 33, 58, 4, 53, 2, 77, 18, 79, 7, 32, 65, 13, 85, 27, 43, 36, 8, 48, 6, 34, 22, 84, 45, 62, 12, 15, 81, 49, 44, 25, 42, 70, 64, 78, 67, 46, 57, 74, 86, 60, 50, 80, 52, 75, 73, 82, 51, 59, 47, 56, 63, 83, 54, 76, 71, 69, 68, 61, 55, 66, 72],
        twoColumns: [4, 31, 27, 55, 11, 86, 40, 41, 62, 78, 79, 74, 1, 47, 77, 19, 60, 17, 32, 30, 44, 76, 52, 57, 72, 54, 7, 81, 71, 28, 58, 49, 36, 8, 29, 46, 80, 63, 35, 25, 9, 14, 22, 15, 23, 75, 85, 68, 45, 16, 64, 13, 70, 2, 42, 67, 82, 66, 20, 73, 56, 5, 33, 69, 51, 48, 12, 53, 50, 43, 38, 18, 21, 59, 24, 34, 83, 65, 39, 61, 37, 26, 6, 3, 10],
    },
    clothes: {
        fourColumns: [2, 28, 11, 21, 15, 20, 5, 13, 6, 26, 24, 18, 1, 23, 7, 8, 16, 30, 19, 14, 17, 29, 27, 10, 22, 12, 4, 9],
        threeColumns: [8, 5, 28, 24, 27, 9, 29, 13, 26, 23, 1, 2, 11, 22, 3, 16, 18, 17, 15, 21, 20, 12, 25, 7, 10, 6, 4, 14, 30],
        twoColumns: [2, 28, 11, 21, 15, 20, 5, 13, 6, 26, 24, 18, 1, 23, 7, 8, 16, 30, 19, 14, 17, 29, 27, 10, 22, 12, 4, 9],
    },
    furniture: {
        fourColumns: [40, 43, 27, 37, 26, 9, 24, 42, 1, 20, 30, 29, 19, 33, 17, 2, 6, 23, 22, 12, 34, 39, 36, 21, 3, 25, 7, 35, 13, 38, 31, 28, 4, 18, 5, 32, 14, 16, 10, 11, 41, 15],
        threeColumns: [40, 43, 27, 37, 26, 9, 24, 42, 1, 20, 30, 29, 19, 33, 17, 2, 6, 23, 22, 12, 34, 39, 36, 21, 3, 25, 7, 35, 13, 38, 31, 28, 4, 18, 5, 32, 14, 16, 10, 11, 41],
        twoColumns: [40, 43, 27, 37, 26, 9, 24, 42, 1, 20, 30, 29, 19, 33, 17, 2, 6, 23, 22, 12, 34, 39, 36, 21, 3, 25, 7, 35, 13, 38, 31, 28, 4, 18, 5, 32, 14, 16, 10, 11, 41, 15],
    },
    jewerly: {
        fourColumns: [42, 26, 54, 44, 1, 16, 2, 3, 19, 33, 43, 41, 51, 22, 48, 23, 50, 30, 7, 6, 52, 8, 28, 61, 9, 21, 27, 49, 25, 18, 62, 17, 36, 39, 10, 4, 29, 35, 60, 20, 55, 47, 5, 32, 40, 11, 13, 24, 38, 15, 14, 56, 34, 31, 59, 58, 12, 46, 57, 45],
        threeColumns: [42, 26, 54, 44, 1, 16, 2, 3, 19, 33, 43, 41, 51, 22, 48, 23, 50, 30, 7, 6, 52, 8, 28, 61, 9, 21, 27, 49, 25, 18, 62, 17, 36, 39, 10, 4, 29, 35, 60, 20, 55, 47, 5, 32, 40, 11, 13, 24, 38, 15, 14, 56, 34, 31, 59, 58, 12, 46, 57, 45],
        twoColumns: [42, 26, 54, 44, 1, 16, 2, 3, 19, 33, 43, 41, 51, 22, 48, 23, 50, 30, 7, 6, 52, 8, 28, 61, 9, 21, 27, 49, 25, 18, 62, 17, 36, 39, 10, 4, 29, 35, 60, 20, 55, 47, 5, 32, 40, 11, 13, 24, 38, 15, 14, 56, 34, 31, 59, 58, 12, 46, 57, 45],
    },
    technics: {
        fourColumns: [1, 19, 16, 22, 8, 37, 39, 11, 6, 9, 4, 23, 21, 7, 38, 43, 33, 42, 25, 10, 2, 17, 20, 24, 26, 28, 31, 36, 40, 35, 27, 30, 13, 15, 5, 18, 3, 12, 34, 29, 32, 41],
        threeColumns: [1, 19, 16, 22, 8, 37, 39, 11, 6, 9, 4, 23, 21, 7, 38, 43, 33, 42, 25, 10, 2, 17, 20, 24, 26, 28, 31, 36, 40, 35, 27, 30, 13, 15, 5, 18, 3, 12, 34, 29, 32, 41],
        twoColumns: [1, 19, 16, 22, 8, 37, 39, 11, 6, 9, 4, 23, 21, 7, 38, 43, 33, 42, 25, 10, 2, 17, 20, 24, 26, 28, 31, 36, 40, 35, 27, 30, 13, 15, 5, 18, 3, 12, 34, 29, 32, 41],
    },
    prams: {
        fourColumns: [9, 14, 27, 17, 1, 41, 23, 26, 29, 40, 37, 32, 34, 21, 10, 31, 5, 20, 25, 28, 39, 30, 15, 33, 24, 7, 16, 35, 2, 36, 3, 6, 12, 8, 19, 11, 22, 4, 42, 38, 13],
        threeColumns: [9, 14, 27, 17, 1, 41, 23, 26, 29, 40, 37, 32, 34, 21, 10, 31, 5, 20, 25, 28, 39, 30, 15, 33, 24, 7, 16, 35, 2, 36, 3, 6, 12, 8, 19, 11, 22, 4, 42, 38, 13],
        twoColumns: [9, 14, 27, 17, 1, 41, 23, 26, 29, 40, 37, 32, 34, 21, 10, 31, 5, 20, 25, 28, 39, 30, 15, 33, 24, 7, 16, 35, 2, 36, 3, 6, 12, 8, 19, 11, 22, 4, 42, 38, 13],
    }
};

export const preShowConfig = {
    portfolio: {
        fourColumns: 25,
        threeColumns: 25,
        twoColumns: 24,
    },
    clothes: {
        fourColumns: 24,
        threeColumns: 26,
        twoColumns: 26,
    },
    furniture: {
        fourColumns: 25,
        threeColumns: 27,
        twoColumns: 25,
    },
    jewerly: {
        fourColumns: 24,
        threeColumns: 24,
        twoColumns: 24,
    },
    technics: {
        fourColumns: 25,
        threeColumns: 25,
        twoColumns: 25,
    },
    prams: {
        fourColumns: 26,
        threeColumns: 24,
        twoColumns: 26,
    }
}

export const bastardsConfig = {
    portfolio: {
        fourColumns: {
            "83": `
                .portfolio_83 {
                    
                }

                .portfolio_83-img {
                    
                }
            `,
            "82": ``
        },
        threeColumns: {
            "83": ``
        },
        twoColumns: {},
    },
    clothes: {
        fourColumns: {},
        threeColumns: {},
        twoColumns: {},
    },
    furniture: {
        fourColumns: {},
        threeColumns: {},
        twoColumns: {},
    },
    jewerly: {
        fourColumns: {},
        threeColumns: {},
        twoColumns: {},
    },
    technics: {
        fourColumns: {},
        threeColumns: {},
        twoColumns: {},
    },
    prams: {
        fourColumns: {},
        threeColumns: {},
        twoColumns: {},
    },
}


export const configGridStyles = [
    {
        width: 300,
        height: 615,
        class: "g1-2",
    },
    {
        width: 615,
        height: 300,
        class: "g2-1",
    },
    {
        width: 300,
        height: 300,
        class: "g1-1",
    },
    {
        width: 615,
        height: 615,
        class: "g2-2",
    },
    {
        width: 300,
        height: 200,
        class: "g1-0_66",
    },
    {
        width: 300,
        height: 450,
        class: "g1-1_5",
    },
    {
        width: 615,
        height: 410,
        class: "g2-1_5",
    },
];



export const bastardsConfigShah = {
    portfolio: {
        fourColumns: {
            div: `.portfolio_62{
                grid-row: span 9;
                background: white;
            }`
        },
        threeColumns: [
        `.portfolio__container .portfolio_62{
            grid-row: span 9;
            background: white;
        }\n`,
        `.portfolio__container .portfolio_62 img{
            object-fit: contain;
        }\n`
        ],
        twoColumns: {},
    },
    clothes: {
        fourColumns: {},
        threeColumns: {},
        twoColumns: {},
    },
    furniture: {
        fourColumns: {},
        threeColumns: {},
        twoColumns: {},
    },
    jewerly: {
        fourColumns: {},
        threeColumns: {},
        twoColumns: {},
    },
    technics: {
        fourColumns: {},
        threeColumns: {},
        twoColumns: {},
    },
    prams: {
        fourColumns: {},
        threeColumns: {},
        twoColumns: {},
    },
}
