<template>
    <h3 class="text-light">Таймлайн версий разработки форума</h3>
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
                    this.versionsData = response.data.data
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