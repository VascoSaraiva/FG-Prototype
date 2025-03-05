
const config = require('../config/config');

const {
    defaultOptions
} = config.AI

const narrativePrompts = {
    ingredients: {
        system: `You are a masterful short story architect, specializing in crafting compelling narrative elements that serve as the foundation for imaginative fictional stories. Your stories are always unique, but you never sacrifice logical coherence, ensuring that all elements are both intriguing and structurally sound.

        The narratives you create carry a fairy-tale-like quality, even when they belong to different genres, and the characters and concepts are simple yet universally appealing, resonating deeply with readers. Your ideas can range from light, family-friendly adventures, whimsical tales, or humorous stories, to darker, more serious narratives involving complex moral dilemmas, suspense, and exploration of deeper human or societal themes.

        Your responses must always be written in European Portuguese (Portugal), using clear, concise language.  Don't write any cringe worthy text. Try to be very self-critical about that.`,

        message: `Your client is designing an educational activity and wants a fictional narrative story idea to serve as the background for the activity. Suggest highly creative narrative elements that could form the basis for a story. Consider the following activity characteristics when crafting the narrative elements: `,

        options: defaultOptions,

        format: {
            "type": "json_schema",
            "json_schema": {
                "name": "narrative_elements_schema",
                "description": "Creates the key narrative elements that form the foundations for a short story.",
                "schema": {
                    "type": "object",
                    "properties": {
                        "genres": {
                            "type": "array",
                            "description": "The story's genre. Choose between 1 and 2 genres that may complementary. Consider the story's target audience when choosing. Examples: 'Fantasia', 'Ficção Ciêntifica', 'Mistério', 'Noir', 'História', 'Distopia', 'Utopia', 'Terror', 'Romance', 'Comédia', 'Thriller', 'Western', 'Épico', 'Poesia', 'Fábula', 'Reportagem', 'Aventura', 'Realismo'.",
                            "items": {
                                "type": "string"
                            }
                        },
                        "concept": {
                            "type": "string",
                            "description": "The main concept that sets the basic foundation of the narrative. It should be based on famous cultural references, clichés, or tropes from pop culture, literature, or mythology. Consider the age and intellectual level of the intended target-audience. For younger audiences, keep the concept clear and family-friendly, whereas for older or more mature readers, you can explore more nuanced ideas. Choose a famous book, movie, TV show, game, or cultural reference as the basis and stick to it. Consider using well-known themes or clichés, but feel free to introduce unexpected combinations that relate to the typology of the activity provided and fit into the chosen story genres. Keep it one sentence only, in the form of a question starting with 'E se...?'. Examples: 'E se se utilizassem recursos naturais para escapar de uma ilha deserta numa situação de emergência?', 'E se se resolvessem enigmas matemáticos para encontrar um artefacto perdido?', 'E se se voltasse atrás no tempo para alertar a população dos perigos da poluição?', 'E se um grupo de astronautas se despenhasse num planeta remoto e tivesse de ser engenhoso para arranjar formas de sair de lá?', 'E se se usasse a ciência para criar 'feitiços' que resolvessem problemas do dia-a-dia?', 'E se aliens precisassem de organizar uma recolha para ajudar um planeta vizinho que está a passar por uma crise de recursos?'"
                        },
                        "conflict": {
                            "type": "string",
                            "description": "It should anwser the question: What is the main challenge or obstacle the protagonist will face in the story?"
                        },
                        "protagonist": {
                            "type": "object",
                            "description": "The main character(s) of the story. It must be a group entity representative of the readers. Examples: 'Caçadores de Fórmulas', 'Guaridões das Nuvens', 'Agentes Secretos'...",
                            "properties": {
                                "label": {
                                    "type": "string",
                                    "description": "It should offer a clear, concise and short answer to the question: How is the protagonist recognized in the story universe?"
                                },
                                "description": {
                                    "type": "string",
                                    "description": "The protagonist's role in the narrative. It should not include any psychological or aesthetic details. It can include descriptions of objects, clothes, or accessories essential for the story."
                                }
                            },
                            "required": [
                                "label",
                                "description"
                            ],
                            "additionalProperties": false
                        },
                        "characters": {
                            "type": "object",
                            "description": "Secondary character(s) important to move the plot forward and support narrative themes.",
                            "properties": {
                                "type": {
                                    "type": "string",
                                    "enum": [
                                        "Inimigo",
                                        "Necessitado",
                                        "Colaborador",
                                        "Inimigos",
                                        "Necesitados",
                                        "Colaboradores",
                                        "Inimiga",
                                        "Necessitada",
                                        "Colaboradora",
                                        "Inimigas",
                                        "Necessitadas",
                                        "Colaboradoras"
                                    ]
                                },
                                "label": {
                                    "type": "string",
                                    "description": "It should offer a clear, concise and short answer to the question: How is this character recognized in the story universe?"
                                },
                                "description": {
                                    "type": "string",
                                    "description": "Keep it very simple, minimal and objective, focusing on the character's role in the story."
                                }
                            },
                            "required": [
                                "type",
                                "label",
                                "description"
                            ],
                            "additionalProperties": false
                        },
                        "scenario": {
                            "type": "object",
                            "description": "The setting where the story takes place.",
                            "properties": {
                                "type": {
                                    "type": "string",
                                    "enum": [
                                        "Localização",
                                        "Contexto Temporal"
                                    ]
                                },
                                "title": {
                                    "type": "string",
                                    "description": "It should offer a clear, concise and short answer to the question: How should the setting be referenced in the story?"
                                },
                                "description": {
                                    "type": "string",
                                    "description": "A brief description of what should be the setting's role in the story."
                                }
                            },
                            "required": [
                                "type",
                                "title",
                                "description"
                            ],
                            "additionalProperties": false
                        },
                        "narrator": {
                            "type": "object",
                            "properties": {
                                "type": {
                                    "type": "string",
                                    "enum": [
                                        "Heterodiegético",
                                        "Homodiegético",
                                        "Autodiegético"
                                    ]
                                },
                                "description": {
                                    "type": "string",
                                    "description": "The narrator's role in the narrative."
                                },
                                "voice": {
                                    "type": "array",
                                    "description": "Choose up to 2 voices for the narrator. The tone should vary based on the audience. For younger audiences, the tone should be light, playful, and engaging, while for older or more mature audiences, a more serious, reflective, or suspenseful tone may be appropriate. Examples: 'Formal', 'Informal', 'Parcial', 'Imparcial', 'Frio', 'Poético', 'Cómico', 'Lírico', 'Dramático', 'Épico', 'Irritante', 'Sarcástico', 'Cínico', 'Satírico', 'Didático', 'Filosófico'.",
                                    "items": {
                                        "type": "string"
                                    }
                                }
                            },
                            "required": [
                                "type",
                                "description",
                                "voice"
                            ],
                            "additionalProperties": false
                        },
                        "suspense": {
                            "type": "string",
                            "description": "Create a suspense question that will drive the reader's curiosity."
                        },
                        "title": {
                            "type": "string",
                            "description": "The story's title."
                        }
                    },
                    "required": [
                        "genres",
                        "concept",
                        "conflict",
                        "protagonist",
                        "characters",
                        "scenario",
                        "narrator",
                        "suspense",
                        "title"
                    ],
                    "additionalProperties": false
                },
                "strict": true
            }
        }
    },
    moments: {
        system: `You are a short story writer, expert in writing narratives that follow a structural approach and adhere faithfully to your client's requests. 

        The stories you create carry a fairy-tale-like quality, even when they belong to different genre. The characters are kept simple and abstract, so that every reader might see him or herself in it. In this way, the stories you create have the simplicity of myth.

        Your stories vary based on your target audience, spanning from light, family-friendly adventures and whimsical tales to humorous stories, as well as darker, more serious narratives that explore complex moral dilemmas, suspense, and deeper human or societal themes.

        Your responses, including the story, must always be written in European Portuguese (Portugal).`,

        message: `A client has provided a story idea for you to write. You must strictly adhere to the narrative elements they have specified. Do not modify, expand, or alter any aspect of the story beyond what is given. This includes refraining from adding new protagonists, names, expanding character or scenario details beyond their descriptions, or introducing additional narrative elements not provided by the client.

        Ensure that the story fully reflects the specified genre(s) and maintains its intended narration voice and narrator. Treat the provided elements as your rulebook and follow them consistently throughout the writing process.

        Here are the key elements you must incorporate:`,

        options: defaultOptions,

        format: {
            "type": "json_schema",
            "json_schema": {
                "name": "narrative_moments_schema",
                "description": "Create a short story structured into 5 moments",
                "schema": {
                    "type": "object",
                    "description": "The main object that contains the story moments. Always structure it into 5 moments.",
                    "properties": {
                        "moments": {
                            "type": "array",
                            "description": "Each moment, like a traditional story arc, represents different stages of the story. Each moment has different purposes and tension levels. The moments and the overall story should strictly follow a logical sequence and a simple linear temporality. Each moment should be 50-80 words in length.",
                            "items": {
                                "moment_1": {
                                    "type": "object",
                                    "description": "Its a moment of 'Discovery'. This first moment should set up the protagonist(s), the scenario and focus on worldbuilding. The protagonist(s) description should not include any psychological or aesthetic details. Follow exclusively the information already provided.",
                                    "properties": {
                                        "title": {
                                            "type": "string",
                                            "description": "The title of the moment. Its the equivalent of a title for a chapter in a book."
                                        },
                                        "text": {
                                            "type": "string",
                                            "description": "The story text itself. Should be 350-500 words long. Strictly follow the narrator type and voice"
                                        }
                                    },
                                    "required": [
                                        "title",
                                        "text"
                                    ],
                                    "additionalProperties": false
                                },
                                "moment_2": {
                                    "type": "object",
                                    "description": "Its a moment of 'Onboarding'. This second moment should introduce readers to the main conflict of the story, the one specified by the client. The tension level rises. The element of suspense should be presented here. The secondary character(s) should also be introduced in this moment.",
                                    "properties": {
                                        "title": {
                                            "type": "string",
                                            "description": "The title of the moment. Its the equivalent of a title for a chapter in a book."
                                        },
                                        "text": {
                                            "type": "string",
                                            "description": "The story text itself. Should be 350-500 words long. Strictly follow the narrator type and voice"
                                        }
                                    },
                                    "required": [
                                        "title",
                                        "text"
                                    ],
                                    "additionalProperties": false
                                },
                                "moment_3": {
                                    "type": "object",
                                    "description": "Its a moment of 'Scaffolding'. This third moment should focus on action and progression of the plot. Avoid describe the actions in too much detail, only 'announce' that they will happen. You should write the actions in a way that the reader fills in the gaps with their imagination.",
                                    "properties": {
                                        "title": {
                                            "type": "string",
                                            "description": "The title of the moment. Its the equivalent of a title for a chapter in a book."
                                        },
                                        "text": {
                                            "type": "string",
                                            "description": "The story text itself. Should be 350-500 words long. Strictly follow the narrator type and voice"
                                        }
                                    },
                                    "required": [
                                        "title",
                                        "text"
                                    ],
                                    "additionalProperties": false
                                },
                                "moment_4": {
                                    "type": "object",
                                    "description": "Its a moment of 'Climax'. This fourth moment should be the peak of the story. The protagonist(s) should face the main conflict and the tension should be at its highest level. The end of this moment should leave the reader with a cliffhanger.",
                                    "properties": {
                                        "title": {
                                            "type": "string",
                                            "description": "The title of the moment. Its the equivalent of a title for a chapter in a book."
                                        },
                                        "text": {
                                            "type": "string",
                                            "description": "The story text itself. Should be 350-500 words long. Strictly follow the narrator type and voice"
                                        }
                                    },
                                    "required": [
                                        "title",
                                        "text"
                                    ],
                                    "additionalProperties": false
                                },
                                "moment_5": {
                                    "type": "object",
                                    "description": "Its a moment of 'Endgame'. This fifth and last moment should resolve the main conflict of the story. The element of suspense should finally be answered. The tension should decrease and the story should have a clear ending. The protagonist(s) should have a clear resolution to their conflict. At the same time, the ending shouldn't be too much dependent on the success and material achievements of the protagonist(s), as in 'the journey is more important than the destination'. The end should be positive and it can also be hopeful, moral, comic, revelatory, an appeal, a warning, etc...",
                                    "properties": {
                                        "title": {
                                            "type": "string",
                                            "description": "The title of the moment. Its the equivalent of a title for a chapter in a book."
                                        },
                                        "text": {
                                            "type": "string",
                                            "description": "The story text itself. Should be 350-500 words long. Strictly follow the narrator type and voice"
                                        }
                                    },
                                    "required": [
                                        "title",
                                        "text"
                                    ],
                                    "additionalProperties": false
                                }
                            }
                        }
                    },
                    "required": [
                        "moments"
                    ],
                    "additionalProperties": false
                }
            }
        }
    }
}

module.exports = narrativePrompts