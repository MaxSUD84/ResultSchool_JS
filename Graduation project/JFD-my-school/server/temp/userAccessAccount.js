// Выбирем и зашифруем пароли для определенных пользователей

import bcrypt from "bcryptjs";
const users = [
    {
        className: "5А",
        mentor: {
            id: "63f73a8eb71d2ee4eda7003c",
            fullName: "Романова Инна Борисовна",
            email: "Romanova_Inna82@yandex.ru",
            password: "R0m@n_IInn@_2Va8",
            hashed_password: "",
        },
        learner_list: [
            {
                id: "63f73a8eb71d2ee4eda70088",
                fullName: "Мясникова Галина",
                email: "myasnikova.galina.3234@gmail.com",
                password: "9Антонина92",
                hashed_password: "",
            },
            {
                id: "63f73a8eb71d2ee4eda700a8",
                fullName: "Уварова Лада",
                email: "uvarova.lada_3400@ya.ru",
                password: "4Людмила71",
                hashed_password: "",
            },
            {
                id: "63f73a8eb71d2ee4eda7009d",
                fullName: "Самойлова Марта",
                email: "samoylova.marta_3973@narod.ru",
                password: "3Ева45",
                hashed_password: "",
            },
            {
                id: "63f73a8eb71d2ee4eda700b5",
                fullName: "Субботин Клим",
                email: "subbotin.klim4302@gmail.com",
                password: "6Людмила05",
                hashed_password: "",
            },
            {
                id: "63f73a8eb71d2ee4eda70096",
                fullName: "Кондратьева Тамара",
                email: "kondrateva.tamara_3045@gmail.com",
                password: "7Клементина54",
                hashed_password: "",
            },
        ],
    },
    {
        className: "5К",
        mentor: {
            id: "63f73a94b71d2ee4eda7040d",
            fullName: "Шароваа Инна Борисовна",
            email: "sharora.inna.85@mail.ru",
            password: "$HaR0v_1nn@_V8",
            hashed_password: "",
        },
        learner_list: [
            {
                id: "63f73a8eb71d2ee4eda700b2",
                fullName: "Пахомова Юлия",
                email: "pahomova.yuliya_3395@list.ru",
                password: "9Марина66",
                hashed_password: "",
            },
            {
                id: "63f73a8eb71d2ee4eda7005c",
                fullName: "Потапов Валериан",
                email: "potapov.valerian_3147@inbox.ru",
                password: "4Анжелика57",
                hashed_password: "",
            },
            {
                id: "63f73a8eb71d2ee4eda70056",
                fullName: "Пестова Марина",
                email: "pestova.marina_2010@rambler.ru",
                password: "9Василиса18",
                hashed_password: "",
            },
            {
                id: "63f73a8eb71d2ee4eda70055",
                fullName: "Уварова София",
                email: "uvarova.sofiya3338@yandex.ru",
                password: "2Искра76",
                hashed_password: "",
            },
            {
                id: "63f73a8eb71d2ee4eda700af",
                fullName: "Орлов Артур",
                email: "orlov.artur.4156@mail.ru",
                password: "4Елена15",
                hashed_password: "",
            },
        ],
    },
    {
        className: "6Б",
        mentor: {
            id: "63f73a8eb71d2ee4eda70035",
            fullName: "Романова Инна Борисовна",
            email: "Romanova_Inna82@yandex.ru",
            password: "R0m@n_IInn@_2Va8",
            hashed_password: "",
        },
        learner_list: [
            {
                id: "63f73a8eb71d2ee4eda70057",
                fullName: "Михайлов Прохор",
                email: "mihaylov.prohor_3095@bk.ru",
                password: "2Жанна11",
                hashed_password: "",
            },
            {
                id: "63f73a8eb71d2ee4eda7006f",
                fullName: "Шарапов Георгий",
                email: "sharapov.georgiy2939@mail.ru",
                password: "0Эмилия89",
                hashed_password: "",
            },
            {
                id: "63f73a8eb71d2ee4eda7008f",
                fullName: "Кузнецов Ефим",
                email: "kuznecov.efim.4279@narod.ru",
                password: "9Надежда36",
                hashed_password: "",
            },
            {
                id: "63f73a8eb71d2ee4eda700a0",
                fullName: "Шубина Лидия",
                email: "shubina.lidiya3893@inbox.ru",
                password: "2Раиса26",
                hashed_password: "",
            },
            {
                id: "63f73a8eb71d2ee4eda70066",
                fullName: "Сафонова Лада",
                email: "safonova.lada_4227@bk.ru",
                password: "3Дина20",
                hashed_password: "",
            },
        ],
    },
];

export async function cryptInitLogin() {
    const _users = await Promise.all(
        users.map(async (chClass) => {
            const newMentor_hashed_password = await bcrypt.hash(chClass.mentor.password, 12);
            const newList_Learner = await Promise.all(
                chClass.learner_list.map(async (lear) => {
                    const lear_hashed_password = await bcrypt.hash(lear.password, 12);
                    return {
                        ...lear,
                        hashed_password: lear_hashed_password,
                    };
                })
            );

            return {
                ...chClass,
                mentor: {
                    ...chClass.mentor,
                    hashed_password: newMentor_hashed_password,
                },
                learner_list: newList_Learner,
            };
        })
    );

    if (_users) {
        const forPrint = _users.map(async (_chClass) => {
            return {
                ..._chClass,
                mentor: JSON.stringify(_chClass.mentor),
                learner_list: JSON.stringify(_chClass.learner_list),
            };
        });
        console.log(forPrint);
    }
}
