<template>
    <h3 class="text-light">Таймлайн версий разработки форума</h3>

    <div class="container-fluid">
        <div class="col-sm-4 offset-sm-8">
            <div class="timeline">
                <div v-for="(item, idx) in versionsData" class="timeline-item bg-dark text-light">
                    <h3>{{ item.versionName }}</h3>
                    <p>{{ item.versionDescription }}</p>
                    <span>{{ item.versionDate }}</span>
                    <h1 v-if="item.versionProde" class="text-warning">{{ item.versionProde }}</h1>
                </div>
            </div>
        </div>
    </div>

</template>

<script>

    export default {
        data() {
            return {
                versionsData: []
            }
        },
        methods: {
            async fetchVersionsData() {
                try {
                    const response = await this.$store.dispatch('getDataList', {
                        col: 'versions/versionsList',
                        params: {}
                    })
                    this.versionsData = response.data
                } catch (e) {
                    console.log(e.message)
                }
            }
        },
        async beforeMount() {
            await this.fetchVersionsData()
        }
    }

</script>