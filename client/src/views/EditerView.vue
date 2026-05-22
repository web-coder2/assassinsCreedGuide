<template>

    <h3 class="text-light">Редактор игровых квестов</h3>

    <div class="container-fluid mt-5 row d-flex">

        <div class="col-sm-4 p-3" style="background-color: black;">
            <div class="card text-light m-3" v-for="(quest, idx) in questsArr" style="background-color: rgb(15, 15, 15);">
                <div class="card-header">
                    <h3 class="text-center">{{ quest.title }}</h3>
                </div>
                <div class="card-body" style="background-color: rgb(10, 10, 10);">
                    <h5 class="text-warning">{{ quest._id }}</h5>
                </div>
                <div class="card-footer">
                    <div class="d-flex justify-content-between">
                        <button class="btn btn-outline-danger" @click="setEditQuest(quest)">Изменеить</button>
                        <button class="btn btn-outline-warning" @click="setEditQuest(quest)">отменить изменения</button>
                    </div>
                </div>
            </div>
        </div>

        <div class="col-sm-6 offset-sm-1 p-3" style="background-color: black;">

            <div v-if="alert.visible" class="alert mt-5" :class="alert.type" role="alert">{{ alert.message }}</div>

            <div v-if="editQuestObject" class="card" style="background-color: rgb(15, 15, 15);">
                <div class="card-header">
                    <h3 class="text-center text-light">Изменение квеста {{ editQuestObject._id }}</h3>
                </div>
                <div class="card-body p-5" style="background-color: rgb(10, 10, 10);">
                    <h3 class="text-center text-success">Изменить параметры квеста</h3>
                    <input class="form-control bg-dark text-light mt-4" placeholder="title" v-model="editQuestObject.title">
                    <textarea class="form-control bg-dark text-light mt-4" rows="5" placeholder="descrption" v-model="editQuestObject.description"></textarea>
                    <input class="form-control bg-dark text-light mt-4" placeholder="questArea" v-model="editQuestObject.questArea">
                    <input class="form-control bg-dark text-light mt-4" placeholder="enimies" v-model="editQuestObject.enimies">
                    <div class="mt-2">
                        <div class="mt-3 p-4" style="border: solid 2px purple; border-radius: 15px;" v-for="(miniQuest, idx) in editQuestObject.additionalQuests">
                            <input class="form-control bg-dark text-light mt-1" v-model="miniQuest.title" placeholder="miniTitle">
                            <input class="form-control bg-dark text-light mt-1" v-model="miniQuest.description" placeholder="description">
                            <input class="form-control bg-dark text-light mt-1" v-model="miniQuest.prize" placeholder="prize">
                            <button @click="deleteMiniQuest(idx)" class="btn btn-outline-danger mt-4">delete</button>
                        </div>
                        <div class="d-flex justify-content-between">
                            <button class="btn btn-outline-primary mt-5" @click="addNewMiniQuest">add one mini</button>
                            <button class="btn btn-outline-success mt-5" @click="saveEditObject">save editObject</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>

    </div>

</template>


<script>

    import dayjs from 'dayjs'

    export default {
        data() {
            return {
                title: "редактор игровых квестов",
                questsArr: [],
                editQuestObject: null,
                alert: {
                    visible: false,
                    message: '',
                    type: null
                }
            }
        },
        methods: {
            async getQuests() {
                try {
                    const response = await this.$store.dispatch('getDataList', {
                        col: 'quests',
                        params: {}
                    })
                    this.questsArr = response.data
                } catch (e) {
                    console.log(e.message)
                }
            },
            async saveEditObject() {
                try {
                    const response = await this.$store.dispatch('createDataList', {
                        col: 'quests/edit',
                        data: {
                            newData: this.editQuestObject,
                            questId: this.editQuestObject._id
                        }
                    })
                    this.alert = {
                        visible: true,
                        message: 'объект квеста успешно обновлен )))',
                        type: 'alert-warning'
                    }

                    await this.getQuests()

                } catch (e) {
                    console.log(e.message)

                    this.alert = {
                        visible: true,
                        message: `ошибка обновления квеста ${e.message}`,
                        type: 'alert-danger'
                    }
                }

                setTimeout(() => {
                    this.alert.visible = false
                }, 3000)
            },
            setEditQuest(item) {
                // чтобы было глубокое копированрие и при изменение editUserObject свойстване менялось свойство и item
                this.editQuestObject = { ...item }
            },
            deleteMiniQuest(index) {
                this.editQuestObject.additionalQuests.splice(index, 1)
            },
            addNewMiniQuest() {
                this.editQuestObject.additionalQuests.push({
                    title: '',
                    description: '',
                    prize: ''
                })
            }
        },
        async beforeMount() {
            await this.getQuests()
        }
    }

</script>