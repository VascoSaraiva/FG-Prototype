"desc": {
                "type": "string",
                "maxLength": 400,
                "description": "Um parágrafo que sintetize em que consiste a atividade. Deve ser capaz de responder às perguntas: O quê? Quando? Onde? Como? Porquê?"
            }



               "octalysis": {
                                    "type": "object",
                                    "description": "A categorização da motivação nos principios da framework Octalysis.",
                                    "properties": {
                                        "coreDrive": {
                                            "type": "object",
                                            "items": {
                                                "type": {
                                                    "type": "string",
                                                    "description": "Os 8 core drives da framework Octalysis. Categoriza cada motivação num dos 8 core drives.",
                                                    "enum": [
                                                        "Epic Meaning & Calling",
                                                        "Development & Accomplishment",
                                                        "Empowerment of Creativity & Feedback",
                                                        "Ownership & Possession",
                                                        "Social Influence & Relatedness",
                                                        "Scarcity & Impatience",
                                                        "Unpredictability & Curiosity",
                                                        "Loss & Avoidance",
                                                        "Social Pressure & Envy",
                                                        "Curiosity & Interest"
                                                    ]
                                                },
                                                "explanation": {
                                                    "type": "string",
                                                    "maxLength": 500,
                                                    "description": "Uma explicação onde explicas o porquê de associares a motivação ao core drive escolhido e fundamentas com base nos principios da framework Octalysis."
                                                }
                                            }
                                        },
                                        "origin": {
                                            "type": "object",
                                            "items": {
                                                "type": {
                                                    "type": "string",
                                                    "description": "A orientação da motivação. A motivação intrínseca é aquela que é interna ao participante e representa o hemisfério direito do cérebro. A motivação extrínseca é aquela que surge de fora do participante e representa o hemisfério esquerdo do cérebro.",
                                                    "enum": [
                                                        "Intrinseca",
                                                        "Extrínseca"
                                                    ]
                                                },
                                                "explanation": {
                                                    "type": "string",
                                                    "maxLength": 500,
                                                    "description": "Uma explicação onde explicas o racicionio por trás da tua decisão e fundamentas com base nos principios da framework Octalysis."
                                                }
                                            }
                                        },
                                        "hat": {
                                            "type": "object",
                                            "items": {
                                                "type": {
                                                    "type": "string",
                                                    "description": "O tipo de sentimentos e emoções que emergem e que despoletam a motivação. Exemplo: O sentimento de estar motivado porque tenho medo de perder o meu progresso é fundamentalmente diferente do de estar motivado porque sinto que sou criativo e capaz por ter resolvido um puzzle.",
                                                    "enum": [
                                                        "Black Hat Gamification",
                                                        "White hat Gamificationa"
                                                    ]
                                                },
                                                "explanation": {
                                                    "type": "string",
                                                    "maxLength": 500,
                                                    "description": "Uma explicação onde explicas o racicionio por trás da tua decisão e fundamentas com base nos principios da framework Octalysis."
                                                }
                                            }
                                        }
                                    }
                                }