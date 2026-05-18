<template>

    <h3 class="text-light">Все квесты по игре Assassins creed 1</h3>

    <div class="container-fluid d-flex mt-5">
        
        <div class="p-5" style="background-color: black; width: 30%;">
            <button class="btn btn-dark btn-block" @click="isCreate = true">Добавить новый квест</button>
            <div class="mt-5 mr-auto">
                <h3 class="text-light mb-5">Все квесты по игре</h3>
                <div class="card p-3 mt-3" v-for="(quest, index) in questsArray" style="background-color: rgb(12, 12, 12);">
                    <h5 class="text-center text-light">{{ quest.title }}</h5>
                    <hr class="bg-danger">
                    <p class="text-warning">{{ quest.description }}</p>
                    <button class="btn btn-danger" @click="readFullQuestInfo(quest)">read</button>
                </div>
            </div>
        </div>

        <div class="col-sm-4 offset-sm-2">

            <div v-if="isCreate">
                <h3 class="text-light">Создать новый квест</h3>
                <div class="form-group">
                    <input class="form-control bg-dark text-light" placeholder="Название миссии" v-model="newQuest.title">
                    <textarea class="form-control bg-dark text-light mt-3" placeholder="Описание миссии" v-model="newQuest.description"></textarea>
                    <input class="form-control bg-dark text-light mt-3" placeholder="Место мисии" v-model="newQuest.questArea">
                    <input class="form-control bg-dark text-light mt-3" placeholder="Враги в мисии" v-model="newQuest.enimies">
                    <div class="mb-3 form-group">
                        <div class="mt-3 border border-danger p-3" v-for="(mini, idx) in newQuest.additionalQuests">
                            <input class="form-control bg-dark text-light" placeholder="название доп мисии" v-model="mini.title">
                            <input class="form-control bg-dark text-light mt-3" placeholder="описание доп мисии" v-model="mini.description">
                            <input class="form-control bg-dark text-light mt-3" placeholder="награда" v-model="mini.prize">
                            <button class="btn btn-danger mt-3 btn-block" @click="removeMiniMission(idx)">убрать доп мисию</button>
                        </div>
                    </div>
                    <div class="d-flex justify-content-between mt-3">
                        <div>
                            <button class="btn btn-success" @click="createQuest">Добавить</button>
                            <button class="btn btn-primary ml-3" @click="addNewMiniMission">Add</button>
                        </div>
                        <button class="btn btn-danger" @click="isCreate = false">Отменить</button>
                    </div>
                </div>
            </div>


            <div v-if="fullQuestInfo && !isCreate">
                <h4 class="text-light">Информация по миссии <strong class="text-success">{{ fullQuestInfo.title }}</strong></h4>
                <p class="text-warning">В этой миссии будет {{ fullQuestInfo.description }}</p>
                <p class="text-light">миссия проходится в {{ fullQuestInfo.questArea }}</p>
                <div class="text-light">
                    <h5 class="text-success mb-5" v-if="fullQuestInfo.additionalQuests.length > 0">в этой мисии будет {{ fullQuestInfo.additionalQuests.length }} доп миссий</h5>
                    <h5 class="text-danger mb-5" v-if="fullQuestInfo.additionalQuests.length === 0">в этой миссии нет доп миссий</h5>
                    <div v-for="(adden, index) in fullQuestInfo.additionalQuests">
                        <h6 class="text-primary">Доп миссия [{{ index }}] {{ adden.title }}</h6>
                        <p>Описание: {{ adden.description }}</p>
                        <p>Награда: <strong class="text-success">{{ adden.prize }}</strong></p>
                    </div>
                    <p class="mt-5">Враги: <strong class="text-danger">{{ fullQuestInfo.enimies }}</strong></p>
                </div>

                <!-- TODO добавить кнопка для лайка квеста и добавоения в любимые квесты -->

            </div>

        </div>

    </div>

</template>


<script>

    export default {
        data() {
            return {
                questsArray: [],
                isCreate: false,
                newQuest: {
                    title: '',
                    description: '',
                    questArea: '',
                    enimies: '',
                    additionalQuests: []
                },
                fullQuestInfo: null,
                userId: null
            }
        },
        methods: {
            async createQuest() {
                try {
                    const response = await this.$store.dispatch('createDataList', {
                        col: 'quests/create',
                        data: {
                            data: this.newQuest
                        }
                    })

                    this.newQuest = {
                        title: '',
                        description: '',
                        questArea: '',
                        enimies: '',
                        additionalQuests: []
                    }

                } catch (e) {
                    console.log(e.message)
                }
            },
            async getAllQuests() {
                try {
                    const response = await this.$store.dispatch('getDataList', {
                        col: 'quests',
                        data: {}
                    })
                    this.questsArray = response.data
                } catch (e) {
                    console.log(e.message)
                }
            },
            readFullQuestInfo(item) {
                this.isCreate = false
                this.fullQuestInfo = item
            },
            addNewMiniMission() {
                this.newQuest.additionalQuests.push({
                    title: '',
                    description: '',
                    prize: ''
                })
            },
            removeMiniMission(index) {
                this.newQuest.additionalQuests.splice(index, 1)
            }
        },
        async beforeMount() {
            this.userId = this.$store.getters['getUserId']
            await this.getAllQuests()
        }
    }

</script>