import React from 'react'
import Regenerate from '@/components/buttons/Regenerate';
import Copy from '@/components/buttons/Copy';
import Customize from '@/components/buttons/Customize';
import Generate from '@/components/buttons/Generate';

function App() {

  const jsonString = `{
    "name": "initiative_schema",
    "description": "Creates the structure for an educational activity.",
    "strict": true,
    "schema": {
        "type": "object",
        "properties": {
            "participants": {
                "type": "object",
                "properties": {
                    "educationLevel": {
                        "type": "string",
                        "description": "The educational level of the participants that the activity will attract.",
                        "enum": [
                            "2º Ciclo",
                            "3º Ciclo",
                            "Ensino Secundário",
                            "Licenciatura",
                            "Mestrado",
                            "Doutoramento"
                        ]
                    },
                    "playerType": {
                        "type": "string",
                        "description": "The type of participants the activity will cater to, based on their preferred play style.",
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
            "typology": {
                "type": "string",
                "description": "The type of activity that will be developed. This influences all the other elements of the activity.",
                "enum": [
                    "Concurso",
                    "Exposição",
                    "Mentoria",
                    "Workshop",
                    "Conferência",
                    "Voluntariado",
                    "Palestra",
                    "Celebração",
                    "Reunião",
                    "Investigação",
                    "Festival",
                    "Feira",
                    "Maratona Desportiva",
                    "Projeto"
                ]
            },
            "areas": {
                "type": "array",
                "description": "The domains of knowledge that the activity will address and that the participants will be able to develop.",
                "items": {
                    "type": "string"
                }
            },
            "objective": {
                "type": "object",
                "properties": {
                    "verb": {
                        "type": "string",
                        "description": "The action verb that defines the main objective of the activity.",
                        "enum": [
                            "Criar",
                            "Desenvolver",
                            "Construir",
                            "Desenhar",
                            "Inovar",
                            "Investigar",
                            "Explorar",
                            "Aprender",
                            "Partilhar",
                            "Comunicar",
                            "Resolver",
                            "Descobrir",
                            "Conhecer",
                            "Experimentar",
                            "Organizar",
                            "Apresentar",
                            "Promover",
                            "Refletir",
                            "Pensar",
                            "Questionar",
                            "Analisar",
                            "Compreender",
                            "Avaliar",
                            "Melhorar",
                            "Ajudar",
                            "Colaborar",
                            "Cooperar",
                            "Participar",
                            "Integrar",
                            "Incluir",
                            "Envolver",
                            "Motivar",
                            "Inspirar",
                            "Desafiar",
                            "Estimular",
                            "Fomentar",
                            "Encorajar",
                            "Incentivar",
                            "Impulsionar",
                            "Potenciar",
                            "Fortalecer",
                            "Habilitar",
                            "Treinar",
                            "Formar",
                            "Educar",
                            "Ensinar",
                            "Orientar",
                            "Guiar",
                            "Aconselhar",
                            "Acompanhar"
                        ]
                    },
                    "title": {
                        "type": "string",
                        "description": "The title of the main objective of the activity. Write the title starting the sentence with the previously chosen action verb. It must be an original, differentiating, applicable and measurable idea."
                    }
                },
                "required": [
                    "verb",
                    "title"
                ],
                "additionalProperties": false
            },
            "duration": {
                "type": "object",
                "properties": {
                    "start": {
                        "type": "integer",
                        "description": "Unix timestamp (seconds since epoch)"
                    },
                    "end": {
                        "type": "integer",
                        "description": "Unix timestamp (seconds since epoch)"
                    }
                },
                "required": [
                    "start",
                    "end"
                ],
                "additionalProperties": false
            },
            "tasks": {
                "type": "array",
                "description": "Generate an array of 8 tasks. All tasks must be clear, measurable, specific, realistic and time-bound.",
                "items": {
                    "type": "object",
                    "properties": {
                        "id": {
                            "type": "number"
                        },
                        "phase": {
                            "type": "string",
                            "description": "The phase of the activity in which the task will be performed. The phases should be sequential and have a logical order. The first phase should be the introduction and the last phase should be the conclusion."
                        },
                        "title": {
                            "type": "string",
                            "description": "The title of the task should clearly indicate what the participants will have to do. The sentence should have only one action verb, which should be at the beginning of the sentence. Avoid putting two tasks together in one. This title must directly answer the question: What will the participant do in concrete?"
                        },
                        "verb": {
                            "type": "string",
                            "description": "The action verb that defines the task and is used in the title."
                        },
                        "description": {
                            "type": "string",
                            "description": "A detailed description of the task that complements the title. Write in the future tense. It should provide clear and specific instructions of what the participants will have to do. Consider answering questions like: Does it have any pre-requisites? What are the expected results? How will the task be evaluated? What are the resources available? What are the constraints? Are there any deadlines?"
                        },
                        "motivations": {
                            "type": "array",
                            "description": "The reasons that will lead a participant to perform the task. Generate 2 motivations for each task.",
                            "items": {
                                "type": "object",
                                "properties": {
                                    "id": {
                                        "type": "number"
                                    },
                                    "title": {
                                        "type": "string"
                                    },
                                    "reasoning": {
                                        "type": "string",
                                        "description": "Write a conditional sentence as if you are the participant, such as: 'Se eu ... então ...'. This should illustrate the participant's thinking."
                                    },
                                    "coreDrive": {
                                        "type": "string",
                                        "description": "The Octalysis core drive associated with the motivation. Keep track of the score for each core drive.",
                                        "anyOf": [
                                            {
                                                "const": "CD1: Epic Meaning & Calling",
                                                "description": "The belief that one is contributing to something greater than oneself. Score: +1 White Hat."
                                            },
                                            {
                                                "const": "CD2: Development & Accomplishment",
                                                "description": "The desire to improve oneself, develop skills and overcome challenges. Score: +1 White Hat and +1 Left Brain."
                                            },
                                            {
                                                "const": "CD3: Empowerment of Creativity & Feedback",
                                                "description": "Involvement through creative exploration, experimentation and ability to test different approaches. Score: +1 White Hat and +1 Right Brain."
                                            },
                                            {
                                                "const": "CD4: Ownership & Possession",
                                                "description": "Control over something, including ownership of a process, project and/or institution. Score: +1 White Hat and +1 Right Brain."
                                            },
                                            {
                                                "const": "CD5: Social Influence & Relatedness",
                                                "description": "Social motivators, such as mentorship, social acceptance, feedback, companionship, competition, etc. Score: +1 Right Brain."
                                            },
                                            {
                                                "const": "CD6: Scarcity & Impatience",
                                                "description": "Exclusivity or the fear of missing out. Score: +1 Black Hat and +1 Left Brain."
                                            },
                                            {
                                                "const": "CD7: Unpredictability & Curiosity",
                                                "description": "Interest by not knowing what will happen next. Score: +1 Black Hat and +1 Right Brain."
                                            },
                                            {
                                                "const": "CD8: Loss & Avoidance",
                                                "description": "The desire to avoid negative consequences or prevent undesirable results. Score: +1 Black Hat."
                                            }
                                        ]
                                    }
                                },
                                "required": [
                                    "id",
                                    "title",
                                    "reasoning",
                                    "coreDrive"
                                ],
                                "additionalProperties": false
                            }
                        }
                    },
                    "required": [
                        "id",
                        "title",
                        "verb",
                        "description",
                        "motivations"
                    ],
                    "additionalProperties": false
                }
            },
            "gamificationOverview": {
                "type": "object",
                "description": "The gamification overview should be a summary of the analysis of the activity in the perspective of the Octalysis framework.",
                "properties": {
                    "scores": {
                        "type": "object",
                        "description": "A count of the motivations that have White Hat, Black Hat, Left Brain, and Right Brain core drives. Ensure that no category has a score of 0. If you counting has resulted in a score of 0, reconsider all the tasks and motivations of the activity.",
                        "properties": {
                            "whiteHat": {
                                "type": "number",
                                "description": "The total number of motivations that have White Hat core drives."
                            },
                            "blackHat": {
                                "type": "number",
                                "description": "The total number of motivations that have Black Hat core drives."
                            },
                            "leftBrain": {
                                "type": "number",
                                "description": "The total number of motivations that have Left Brain core drives."
                            },
                            "rightBrain": {
                                "type": "number",
                                "description": "The total number of motivations that have Right Brain core drives."
                            }
                        },
                        "required": [
                            "whiteHat",
                            "blackHat",
                            "leftBrain",
                            "rightBrain"
                        ],
                        "additionalProperties": false
                    },
                    "reasoning": {
                        "type": "string",
                        "description": "Clearly explain, in the first person, the reasoning process behind the prioritization of certain Octalysis categories over others. It should be able to answer the question: Why is the activity gamified the way it is and how it relates to the other elements of the activity?"
                    }
                },
                "required": [
                    "scores",
                    "reasoning"
                ],
                "additionalProperties": false
            },
            "title": {
                "type": "string",
                "description": "The activity title should be short, clear and appealing. It should be able to capture attention and arouse curiosity."
            },
            "desc": {
                "type": "string",
                "description": "A paragraph that summarizes what the activity consists of. It must be able to answer the questions: What? When? Where? How? Why? Who? Based on all the other specified elements of the activity."
            }
        },
        "required": [
            "participants",
            "typology",
            "areas",
            "objective",
            "duration",
            "tasks",
            "gamificationOverview",
            "title",
            "desc"
        ],
        "additionalProperties": false
    }
}`;

  return (
    <main className='container mx-auto'>

      <div>

        <div className='rounded-md border-[0.5px] overflow-hidden border-input max-w-5xl w-full '>
          <div className='flex items-center justify-between px-4 py-1.5 bg-neutral-50 text-neutral-500 border-b border-input'>
            <p className='text-xs font-medium'>JSON</p>
            <div className='flex gap-2'>
              <Regenerate />
              <Copy />
            </div>
          </div>

          <pre className='h-[40rem] overflow-scroll p-4 font-mono text-sm'>
            {jsonString}
          </pre>
        </div>

        <div className='flex flex-col gap-2 mt-2'>
          <Generate />
          <Customize />
        </div>


      </div>



    </main>

  )
}

export default App
