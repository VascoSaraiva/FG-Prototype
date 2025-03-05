
const config = require('../config/config');

const {
    defaultOptions
} = config.AI

const initiativePrompts = {
    structure: {
        system: `You are an expert in designing highly creative and unique educational activities. Your responses must always be written in European Portuguese (Portugal). Use clear and concise language while ensuring your tone is enthusiastic, and captivating. Don't write any cringe worthy text. Be critical of your ideas before suggesting them in the response. Always consider engagement, learning effectiveness, and ease of implementation in your activities.`,

        options: {
            ...defaultOptions,
            temperature: 1
        },

        format: {
            "type": "json_schema",
            "json_schema": {
                "name": "initiative_schema",
                "description": "Creates the structure for an educational activity.",
                "schema": {
                    "type": "object",
                    "properties": {
                        "typology": {
                            "type": "string",
                            "description": "The typology mainly determines the tasks of the activity. For example, 'Concurso' might involve more interactive tasks and group work , while a 'Palestra' (Lecture) would be more focused on presentation and discussion. Response examples: Concurso, Exposição, Mentoria, Workshop, Conferência, Voluntariado, Palestra, Celebração, Reunião, Investigação, Festival, Feira, Maratona Desportiva, Projeto..."
                        },
                        "participants": {
                            "type": "object",
                            "properties": {
                                "educationLevel": {
                                    "type": "string",
                                    "description": "The educational level determines the expected cognitive load and complexity of the activity. For example, higher education levels may require more abstract or research-driven tasks, while lower levels need more hands-on or guided experiences. Response examples: 2º Ciclo, 3º Ciclo, Ensino Secundário, Licenciatura, Mestrado, Doutoramento..."
                                },
                                "playerType": {
                                    "type": "string",
                                    "description": "Player types should inform the design of the activity. For example, 'Achievers' might need clear goals and rewards, while 'Explorers' may benefit from open-ended tasks or discovery-based learning.",
                                    "anyOf": [
                                        {
                                            "const": "Achiever",
                                            "description": "Participants who like to complete tasks, achieve goals and earn rewards."
                                        },
                                        {
                                            "const": "Explorer",
                                            "description": "Participants who like to explore, discover and learn new things."
                                        },
                                        {
                                            "const": "Socializer",
                                            "description": "Participants who like to interact with others, share experiences and build relationships."
                                        },
                                        {
                                            "const": "Killer",
                                            "description": "Participants who like to compete, challenge others and win."
                                        }
                                    ]
                                }
                            },
                            "required": [
                                "educationLevel",
                                "playerType"
                            ],
                            "additionalProperties": false
                        },
                        "areas": {
                            "type": "array",
                            "description": "The domains of knowledge that the activity will address and that the participants will be able to develop. The areas chosen determine the design of specific tasks, objectives, and required task resources. For example, a activity with a focus on 'Matemática' might include more problem-solving tasks, while a activity that focuses on 'Cultura' might involve more research or discussion. Generate an array of up to 4 areas.",
                            "items": {
                                "type": "string"
                            }
                        },
                        "duration": {
                            "type": "object",
                            "description": "Consider how the total duration might influence the pacing of the activity.",
                            "properties": {
                                "total": {
                                    "type": "integer",
                                    "description": "The number representing the total duration of the activity in the unity chosen."
                                },
                                "unit": {
                                    "type": "string",
                                    "description": "The unit of time that will be used to measure the duration of the activity.",
                                    "enum": [
                                        "dias",
                                        "semanas",
                                        "meses",
                                        "anos"
                                    ]
                                }
                            },
                            "required": [
                                "total",
                                "unit"
                            ],
                            "additionalProperties": false
                        },
                        "objective": {
                            "type": "object",
                            "properties": {
                                "title": {
                                    "type": "string",
                                    "description": "The objective must be measurable and aligned with clear evaluation criteria. Participants should be able to assess the success of the objective. This objective should also answer the question: What is the main purpose of the activity? Write a concise sentence, starting with the chosen action verb. Also start tbe sentence with an uppercase letter then continue with lowercase. Example: 'Preservar a vida marinha na ria de Aveiro'."
                                },
                                "verb": {
                                    "type": "string",
                                    "description": "The action verb that is part of the the main objective of the activity. Examples: Criar, Desenvolver, Construir, Desenhar, Inovar, Investigar, Explorar, Aprender, Partilgar, Comunicar, Resolver, Descobrir, Conhecer, Experimentar, Organizar, Apresentar, Promover, Refletir, Pensar, Questionar, Analiasar, Compreender, Avaliar, Melhorar, Ajudar, Colaborar, Copperar, Participar, Integrar, Incluir, Envolver, Motivar, Inspirar, Desafiar, Estimular, Fomentar, Encorajar, Incentivar, Impulsionar, Potenciar, Preservar..."
                                }
                            },
                            "required": [
                                "title",
                                "verb"
                            ],
                            "additionalProperties": false
                        },
                        "tasks": {
                            "type": "array",
                            "description": "Generate an array with the minimum of 7 sequential tasks, where each task is specific and measurable. Ensure that each task progressively builds on previous ones, helping participants gradually develop and apply their skills. For example, a task might involve researching a topic, and the next task could involve presenting findings or solving a related problem using the research. Ensure that each task is framed in a way that emphasizes practical execution and hands-on experience.",
                            "items": {
                                "type": "object",
                                "properties": {
                                    "title": {
                                        "type": "string",
                                        "description": "A sentence that clearly states what the participants must do. Incorporate only a single action verb at the beginning of the sentence. Don't combine combining multiple tasks into one. This field should directly answer the question: What will the participant do specifically? It MUST be something measurable and MUST involve an observable result. Start the title with an uppercase letter, followed by the rest in lowercase. Example: 'Investigar a flora e fauna da área local.'"
                                    },
                                    "verb": {
                                        "type": "string",
                                        "description": "The action verb that defines the task and is used in the title."
                                    },
                                    "description": {
                                        "type": "string",
                                        "description": "A detailed description of the task that complements the title. Write in the future tense. Don't combine multiple tasks into one. It should provide clear and specific instructions of what the participants will have to do. Consider answering questions like: Does it have any pre-requisites? What are the expected results? How will the task be evaluated? What are the resources available? What are the constraints? Are there any deadlines?"
                                    },
                                    "coreDrives": {
                                        "type": "array",
                                        "description": "Pick what you consider to be the essential Octalysis core drives that will motivate the participants to complete this task.",
                                        "items": {
                                            "type": "string",
                                            "anyOf": [
                                                {
                                                    "const": "CD1: Epic Meaning & Calling",
                                                    "description": "The belief that one is contributing to something greater than oneself."
                                                },
                                                {
                                                    "const": "CD2: Development & Accomplishment",
                                                    "description": "The desire to improve oneself, develop skills and overcome challenges."
                                                },
                                                {
                                                    "const": "CD3: Empowerment of Creativity & Feedback",
                                                    "description": "Involvement through creative exploration, experimentation and ability to test different approaches."
                                                },
                                                {
                                                    "const": "CD4: Ownership & Possession",
                                                    "description": "Control over something, including ownership of a process, project and/or institution."
                                                },
                                                {
                                                    "const": "CD5: Social Influence & Relatedness",
                                                    "description": "Social motivators, such as mentorship, social acceptance, feedback, companionship, competition, etc."
                                                },
                                                {
                                                    "const": "CD6: Scarcity & Impatience",
                                                    "description": "Exclusivity or the fear of missing out."
                                                },
                                                {
                                                    "const": "CD7: Unpredictability & Curiosity",
                                                    "description": "Interest by not knowing what will happen next."
                                                },
                                                {
                                                    "const": "CD8: Loss & Avoidance",
                                                    "description": "The desire to avoid negative consequences or prevent undesirable results."
                                                }
                                            ]
                                        }
                                    },
                                    "requirements": {
                                        "type": "array",
                                        "description": "An array of up to 5 logistic requiremenents needed in order to provide the necessary conditions for the task to be performed by the participants. Keep the requirements minimal and directly relevant to the task. For example, 'Google Docs' might be essential for collaborative writing, but a general 'material para anotações' should be excluded unless it's unique to the tasks. Always be specific when listing possible tool requirements.",
                                        "items": {
                                            "type": "string"
                                        }
                                    }
                                },
                                "required": [
                                    "title",
                                    "verb",
                                    "description",
                                    "coreDrives",
                                    "requirements"
                                ],
                                "additionalProperties": false
                            }
                        },
                        "title": {
                            "type": "string",
                            "description": "The title should be engaging and spark curiosity while clearly reflecting the purpose of the activity. A strong title balances clarity with appeal. Example: Plantar o Futuro, Cleanup Lisboa..."
                        },
                        "announcement": {
                            "type": "string",
                            "description": "Write a clear and engaging announcement paragraph directed at the participants, explaining the activity while answering the following: what the activity is about, where it will take place, how it will be carried out (including any relevant pre-requisites), WHY it is important or beneficial, and who is involved (participants, organizers, or facilitators). Ensure the announcement is tailored to the target audience's education level. For instance, an announcement for '2º Ciclo' students might be more informal, while one for 'Mestrado' students might be more formal."
                        }
                    },
                    "required": [
                        "typology",
                        "participants",
                        "areas",
                        "duration",
                        "objective",
                        "tasks",
                        "title",
                        "announcement"
                    ],
                    "additionalProperties": false
                },
                "strict": true
            }
        }
    }
}

module.exports = initiativePrompts
