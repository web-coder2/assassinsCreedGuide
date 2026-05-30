<template>
    <div class="editor-container">
      <h3 class="title">Редактор игровых квестов</h3>
      <div class="row d-flex flex-wrap">
        
        <div class="col-sm-4 p-3" style="background-color: transparent;">
            <div class="card quest-card mb-4" v-for="(quest, idx) in questsArr" :key="quest._id">
                <div class="card-header">
                    <h3 class="text-center">{{ quest.title }}</h3>
                </div>
                <div class="card-body">
                    <h5 class="text-warning mb-2">{{ quest._id }}</h5>
                </div>
                    <div class="card-footer d-flex justify-content-between">
                        <button class="btn btn-outline-primary" @click="setEditQuest(quest)">Изменить</button>
                        <button class="btn btn-outline-danger" @click="setEditQuest(quest)">Удалить изменения</button>
                    </div>
                </div>
            </div>
        
            <div class="col-sm-6 offset-sm-1 p-3" style="background-color: transparent;">
                <div v-if="alert.visible" class="alert" :class="alert.type" role="alert">
                    {{ alert.message }}
                </div>
            
                <div v-if="editQuestObject" class="card quest-edit-card">
                    <div class="card-header">
                        <h3 class="text-center text-light">Изменение квеста {{ editQuestObject._id }}</h3>
                    </div>
                    <div class="card-body p-4">
                        <h3 class="text-center text-success mb-4">Изменить параметры квеста</h3>
                        <input class="form-control mb-3 bg-dark text-light" placeholder="title" v-model="editQuestObject.title"/>
                        <textarea class="form-control mb-3 bg-dark text-light" rows="5" placeholder="description" v-model="editQuestObject.description"></textarea>
                        <input class="form-control mb-3 bg-dark text-light" placeholder="questArea" v-model="editQuestObject.questArea"/>
                        <input class="form-control mb-3 bg-dark text-light" placeholder="enemies" v-model="editQuestObject.enemies"/>
                        <div class="mini-quests p-3 mb-4" v-for="(miniQuest, idx) in editQuestObject.additionalQuests" :key="idx">
                            <input class="form-control mb-2 bg-dark text-light" v-model="miniQuest.title" placeholder="Mini Title"/>
                            <input class="form-control mb-2 bg-dark text-light" v-model="miniQuest.description" placeholder="Description"/>
                            <input class="form-control mb-2 bg-dark text-light" v-model="miniQuest.prize" placeholder="Prize" />
                            <button class="btn btn-outline-danger btn-sm mt-2" @click="deleteMiniQuest(idx)">Удалить мини-задание</button>
                        </div>
                        <div class="d-flex justify-content-between">
                            <button class="btn btn-outline-primary" @click="addNewMiniQuest">Добавить мини-задание</button>
                            <button class="btn btn-outline-success" @click="saveEditObject">Сохранить</button>
                        </div>
                    </div>
                </div>
            </div>
      </div>
    </div>
</template>

<style>

    .editor-container {
        padding: 30px;
        background-color: #000;
        min-height: 100vh;
        font-family: 'Arial', sans-serif;
    }

    .title {
        color: #0f0;
        text-align: center;
        margin-bottom: 30px;
        font-size: 2em;
        text-shadow: 0 0 5px #0f0;
    }

    .quest-card {
        background-color: rgb(15, 15, 15);
        border-radius: 10px;
        box-shadow: 0 0 10px rgba(15, 255, 15, 0.3);
        border: 1px solid #0f0;
        transition: transform 0.2s, box-shadow 0.2s;
    }
    .quest-card:hover {
        transform: translateY(-3px);
        box-shadow: 0 0 15px rgba(15, 255, 15, 0.5);
    }
    .card-header h3 {
        margin: 0;
    }
    .card-body {
        background-color: rgb(10, 10, 10);
    }
    .card-footer {
        background-color: rgb(15, 15, 15);
    }

    .alert {
        padding: 15px;
        border-radius: 8px;
        margin-bottom: 20px;
        font-weight: bold;
    }
    .alert-warning {
        background-color: #222;
        color: #ff0;
        box-shadow: 0 0 10px #ff0;
    }
    .alert-danger {
        background-color: #222;
        color: #f00;
        box-shadow: 0 0 10px #f00;
    }

    .quest-edit-card {
        background-color: rgb(15, 15, 15);
        border-radius: 10px;
        box-shadow: 0 0 15px rgba(0, 255, 0, 0.3);
        border: 1px solid #0f0;
    }
    .mini-quests {
        background-color: rgb(20, 20, 20);
        border: 1px solid #0f0;
        border-radius: 8px;
    }
    .mini-quests input {
        border: none;
        border-bottom: 1px solid #0f0;
        border-radius: 0;
    }
    .mini-quests input:focus {
        outline: none;
        box-shadow: 0 0 8px #0f0;
    }
</style>


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