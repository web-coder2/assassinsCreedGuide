<template>
    <div class="timeline-container">
        <h3 class="title">Таймлайн версий разработки форума</h3>
        <div class="timeline">
            <div v-for="(item, idx) in versionsData" :key="idx" class="timeline-item">
                <div class="content">
                    <h3 class="version-name">{{ item.versionName }}</h3>
                    <p class="version-desc">{{ item.versionDescription }}</p>
                    <div class="date-line">
                        <span class="version-date">{{ item.versionDate }}</span>
                        <h1 v-if="item.versionProde" class="prode">{{ item.versionProde }}</h1>
                    </div>
                </div>
            </div>
        </div>
    </div>

</template>

<style scoped>
.timeline-container {
  padding: 30px;
  background-color: #000;
  min-height: 100vh;
  font-family: 'Arial', sans-serif;
  position: relative;
}

.title {
  color: #0f0;
  text-align: center;
  margin-bottom: 40px;
  font-size: 2em;
  text-shadow: 0 0 5px #0f0;
}

.timeline {
  position: absolute;
  right: 20px;
  top: 100px;
  width: 350px;
  border-left: 3px solid #0f0;
  padding-left: 20px;
  padding: 30px;
  box-shadow: inset 0 0 10px #0f0;
}

.timeline-item {
  background-color: #111;
  border-radius: 8px;
  padding: 15px;
  margin-bottom: 30px;
  border: 1px solid #0f0;
  box-shadow: 0 0 8px rgba(15, 255, 15, 0.3);
  transition: transform 0.2s, box-shadow 0.2s;
}

.timeline-item:hover {
  transform: translateY(-3px);
  box-shadow: 0 0 12px rgba(15, 255, 15, 0.5);
}

.version-name {
  font-size: 1.3em;
  color: #0f0;
  margin-bottom: 8px;
}

.version-desc {
  font-size: 0.95em;
  color: #ccc;
  margin-bottom: 12px;
}

.date-line {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

/* Дата */
.version-date {
  font-size: 0.85em;
  color: #0f0;
  text-shadow: 0 0 3px #0f0;
}

/* Версия PRODE */
.prode {
  font-size: 1.5em;
  color: #0f0;
  margin: 0;
  text-shadow: 0 0 4px #0f0;
}
</style>

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