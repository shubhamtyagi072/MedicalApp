export const question = {
    cat: [
        //{ question_one: "Esempio: Sono molto contento", question_two: "Sono molto triste", answer: [{ option: "0", isSelected: false }, { option: "1", isSelected: false }, { option: "2", isSelected: false }, { option: "3", isSelected: false }, { option: "4", isSelected: false }, { option: "5", isSelected: false }] },
        {
            question_one: "Non tossisco mai", question_two: "Tossisco sempre", user_ans: "", answer: [{ option: "0", isSelected: false }, { option: "1", isSelected: false }, { option: "2", isSelected: false }, { option: "3", isSelected: false }, { option: "4", isSelected: false }, { option: "5", isSelected: false }]
        },
        {
            question_one: "Il mio petto è completamente libero da catarro (muco)", question_two: "Il mio petto è tutto pieno di catarro (muco)", user_ans: "", answer: [{ option: "0", isSelected: false }, { option: "1", isSelected: false }, { option: "2", isSelected: false }, { option: "3", isSelected: false }, { option: "4", isSelected: false }, { option: "5", isSelected: false }]
        },
        {
            question_one: "Non avverto alcuna sensazione di costrizione al petto", question_two: "Avverto una forte sensazione di costrizione al petto", user_ans: "", answer: [{ option: "0", isSelected: false }, { option: "1", isSelected: false }, { option: "2", isSelected: false }, { option: "3", isSelected: false }, { option: "4", isSelected: false }, { option: "5", isSelected: false }]
        },
        {
            question_one: "Quando cammino in salita o salgo una rampa di scale non avverto mancanza di fiato", question_two: "Quando cammino in salita o salgo una rampa di scale avverto una forte mancanza di fiato", user_ans: "", answer: [{ option: "0", isSelected: false }, { option: "1", isSelected: false }, { option: "2", isSelected: false }, { option: "3", isSelected: false }, { option: "4", isSelected: false }, { option: "5", isSelected: false }]
        },
        { question_one: "Non avverto limitazioni nello svolgere qualsiasi attività in  casa", question_two: "Avverto gravi limitazioni nello svolgere qualsiasi attività in casa", user_ans: "", answer: [{ option: "0", isSelected: false }, { option: "1", isSelected: false }, { option: "2", isSelected: false }, { option: "3", isSelected: false }, { option: "4", isSelected: false }, { option: "5", isSelected: false }] },
        {
            question_one: "Mi sento tranquillo ad uscire di casa nonostante la mia malattia polmonare", question_two: "Non mi sento affatto tranquillo ad uscire di casa a causa della mia malattia polmonare", user_ans: "", answer: [{ option: "0", isSelected: false }, { option: "1", isSelected: false }, { option: "2", isSelected: false }, { option: "3", isSelected: false }, { option: "4", isSelected: false }, { option: "5", isSelected: false }]
        },
        {
            question_one: "Dormo profondamente", question_two: "Non riesco a dormire profondamente a causa della mia malattia polmonare", user_ans: "", answer: [{ option: "0", isSelected: false }, { option: "1", isSelected: false }, { option: "2", isSelected: false }, { option: "3", isSelected: false }, { option: "4", isSelected: false }, { option: "5", isSelected: false }]
        },
        { question_one: "Ho molta energia ", question_two: "Non ho nessuna energia", user_ans: "", answer: [{ option: "0", isSelected: false }, { option: "1", isSelected: false }, { option: "2", isSelected: false }, { option: "3", isSelected: false }, { option: "4", isSelected: false }, { option: "5", isSelected: false }] },
    ],
    ANMCO: [

        {
            description: "1. Nel corso delle sue abituali attività, le è mai capitato di avere negli ultimi 3 mesi una sensazione di oppressione al torace, dolore al petto o affanno:",
            questions: [
                {
                    question: "Quando si vestiva o faceva il bagno", options: [{ value: "NO", isSelected: false, point: 0 }, { value: "SI", isSelected: false, point: 3 }]
                },
                {
                    question: "Mentre camminava o faceva piccole attività domestiche ", options: [{ value: "NO", isSelected: false, point: 0 }, { value: "SI", isSelected: false, point: 2 }]
                },
                {
                    question: "Solo se saliva le scale, o portava pesi, o camminava a passo veloce", options: [{ value: "NO", isSelected: false, point: 0 }, { value: "SI", isSelected: false, point: 1 }]
                }
            ]
        },
        {
            description: "2. Nell’ultimo mese le sensazioni di oppressione al torace, dolore al petto o affanno:",
            questions: [
                {
                    question: "Sono state più frequenti che in passato", options: [{ value: "NO", isSelected: false, point: 0 }, { value: "SI", isSelected: false, point: 2 }]
                },
                {
                    question: "I disturbi si sono presentati più volte nelle ultime due settimane", options: [{ value: "NO", isSelected: false, point: 0 }, { value: "SI", isSelected: false, point: 3 }]
                }
            ]
        },
        {
            description: "3.",
            questions: [
                {
                    question: "Ha dovuto assumere le medicine sotto la lingua a causa di questi disturbi?", options: [{ value: "NO", isSelected: false, point: 0 }, { value: "SI", isSelected: false, point: 2 }]
                }
            ]
        },
        {
            description: "4.",
            questions: [
                {
                    question: "Ha avuto necessità di assumere queste medicine nelle ultime due settimane?", options: [{ value: "NO", isSelected: false, point: 0 }, { value: "SI", isSelected: false, point: 3 }]
                }
            ]
        }

    ]


}