const professions = {
    doctor: { _id: "32ee644f95444007aab2e30a0470493b", name: "Доктор" },
    waiter: { _id: "85d8455243d847de8c8c0669d94b9526", name: "Официант" },
    physics: { _id: "2be4882edde843049f43c96f9c654191", name: "Физик" },
    engineer: { _id: "3da1900c04934d178f23ea7660703b80", name: "Инженер" },
    actor: { _id: "2ab6c164c1594e3986259979f619fe34", name: "Актер" },
    cook: { _id: "633d788b4936414c91cc3cc3a4cefa0a", name: "Повар" }
};

const qualities = {
    tedious: {
        _id: "5a39ecad25874a5da43201e6638054d4",
        name: "Нудила",
        color: "primary"
    },
    strange: {
        _id: "7b164caa4e42446c98d5e6b3d578434c",
        name: "Странный",
        color: "secondary"
    },
    buller: {
        _id: "985b8889a1dd4a51a2da336db0192cb0",
        name: "Троль",
        color: "success"
    },
    alcoholic: {
        _id: "5c13576dff4e43e4bee4e960f2800e79",
        name: "Алкоголик",
        color: "danger"
    },
    handsome: {
        _id: "200afb2ac7234ceb8d87075a2afef909",
        name: "Красавчик",
        color: "info"
    },
    uncertain: {
        _id: "0c1827e3ef864b58bc316cab6163becf",
        name: "Неуверенный",
        color: "dark"
    }
};

const users = [
    {
        _id: "6bf824de523146e5bd1462097435a754",
        name: "Джон Дориан",
        professions: professions.doctor,
        qualities: [qualities.tedious, qualities.uncertain, qualities.strange],
        completedMeetings: 36,
        rate: 2.5,
        bookmark: false
    },
    {
        _id: "5af28cee50774dd0ae7be5e7d9753efe",
        name: "Кокс",
        professions: professions.doctor,
        qualities: [qualities.buller, qualities.handsome, qualities.alcoholic],
        completedMeetings: 15,
        rate: 2.5,
        bookmark: false
    },
    {
        _id: "d743db347bfc49bf9e55e17f68f7620d",
        name: "Шелдон Купер",
        professions: professions.physics,
        qualities: [qualities.tedious, qualities.strange],
        completedMeetings: 37,
        rate: 4.6,
        bookmark: false
    },
    {
        _id: "411944eee93146419cc64863c8cf41e6",
        name: "Леонард Хофстедтер",
        professions: professions.physics,
        qualities: [qualities.tedious, qualities.uncertain],
        completedMeetings: 147,
        rate: 3.5,
        bookmark: false
    },
    {
        _id: "543a017efc8e499fbe3836b25e27ce26",
        name: "Говард Воловиц",
        professions: professions.engineer,
        qualities: [qualities.strange, qualities.tedious],
        completedMeetings: 72,
        rate: 3.6,
        bookmark: false
    },
    {
        _id: "3d671fbad9754e7681a4b3bfce6ce942",
        name: "Рататуй",
        professions: professions.cook,
        qualities: [qualities.handsome, qualities.buller],
        completedMeetings: 17,
        rate: 4.5,
        bookmark: false
    }
];

export function fetchAll() {
    return users;
}
