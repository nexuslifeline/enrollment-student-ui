<template>
  <div class="wrapper">
    <div class="left-pane">
      <StageIndicator
        :stages="stages"
        :activeIndex="selectedIndex"
        @selectedItem="onSelectStage"
      />
    </div>
    <div class="right-pane">
      <div class="approval-container">
        <ApprovalIndicator
          :stages="approvalStages"
          :currentStage="selectedApprovalStage"
          @stageSelect="onApprovalStageSelect"
        />
      </div>
      <div class="approval-actions">
        <p>This is for demo purpose only</p>
        <button @click="selectedApprovalStage = 0">Stage 1</button>
        <button @click="selectedApprovalStage = 1">Stage 2</button>
        <button @click="selectedApprovalStage = 2">Stage 3</button>
        <button @click="selectedApprovalStage = 3">Stage 4</button>
        <button @click="selectedApprovalStage = approvalStages.length">Mark all Complete</button>
      </div>
    </div>
  </div>
</template>

<script>
import StageIndicator from '../components/StageIndicator'
import ApprovalIndicator from '../components/ApprovalIndicator'
export default {
  name: 'Demo',
  components: {
    StageIndicator,
    ApprovalIndicator
  },
  data() {
    return {
      selectedIndex: 0,
      selectedApprovalStage: 1,
      stages: [
        {
          header: 'Complete Address',
          description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit psum dolor sit amet psum dolor sit amet'
        },
        {
          header: 'Family Background',
          description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit'
        },
        {
          header: 'Educational Background',
          description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit'
        }
      ],
      approvalStages: [
        { approvedLabel: 'Data Completed', waitingLabel: 'Waiting for Approval' },
        { approvedLabel: 'Approved by Registrar', waitingLabel: 'Waiting for Approval' },
        { approvedLabel: 'Approved by Staff', waitingLabel: 'Waiting for Approval' },
        { approvedLabel: 'Done', waitingLabel: 'Waiting for Completion' }
      ]
    }
  },
  methods: {
    onSelectStage(idx) {
      this.selectedIndex = idx;
    },
    onApprovalStageSelect(idx) {
      this.selectedApprovalStage = idx;
    }
  }
}
</script>
<style lang="scss" scoped>
  .wrapper {
    width: 100%;
    height: 100%;
    display: flex;
  }

  .left-pane {
    flex-basis: 350px;
    padding: 20px;
  }

  .right-pane {
    flex: 1;
  }

  .approval-container {
    width: 100%;
    height: 100px;
  }

  .approval-actions {
    padding: 20px 50px;
  }
</style>