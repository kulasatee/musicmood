<template >
<div style="background-color: #131022; height: 100vh;">
  <div class="container pt-5" style="background-color: #131022;">
    <h1 class="text-start mb-4 linear-color fw-bold">Reservation List</h1>

    <!-- Status nav -->
    <div class="row">
        <div class="btn-group">
            <input class="btn-check" type="radio" name="status-check" id="all" value="all" v-model="selected_status">
            <label class="btn btn-custom status-bar" :class="selected_status == 'all'? 'select-status-bar':'status-bar'" for="all">All Reservation</label>
                        
            <input class="btn-check" type="radio" name="status-check" id="pending" value="pending" v-model="selected_status">
            <label class="btn btn-custom status-bar" :class="selected_status == 'pending'? 'select-status-bar':'status-bar'" for="pending">Pending</label>
                        
            <input class="btn-check" type="radio" name="status-check" id="approved" value="approved" v-model="selected_status">
            <label class="btn btn-custom status-bar" :class="selected_status == 'approved'? 'select-status-bar':'status-bar'" for="approved">Approved</label>
                        
            <input class="btn-check" type="radio" name="status-check" id="rejected" value="rejected" v-model="selected_status">
            <label class="btn btn-custom status-bar" :class="selected_status == 'rejected'? 'select-status-bar':'status-bar'" for="rejected">Rejected</label>
                    
            <label class="btn btn-custom status-bar" style="width: 49rem; cursor: default;"></label>
        </div>
    </div>

    <div class="row mt-4">
        <ul class="list-group list-group-horizontal text-start">
            <li class="list-group-item ps-5" style="width: 11rem">Create</li>
            <li class="list-group-item">Room</li>
            <li class="list-group-item">Type</li>
            <li class="list-group-item" style="width: 7rem">Price</li>
            <li class="list-group-item" style="width: 8rem">Date</li>
            <li class="list-group-item" style="width: 29rem">Time</li>
            <li class="list-group-item">Status</li>
        </ul>
    </div>

    <div class="row mt-3">
        <ul class="list-group list-group-horizontal res-list-group py-3 text-start fw-light align-items-center" v-for="reservation in filteredReservation" :key="reservation.reservation_id">
            <li class="list-group-item ps-5" style="width: 11rem">{{reservation.inform_date}}</li>
            <li class="list-group-item">{{reservation.room_name}}</li>
            <li class="list-group-item">{{reservation.type_name}}</li>
            <li class="list-group-item" style="width: 7rem">{{reservation.room_price}} บาท</li>
            <li class="list-group-item" style="width: 8rem">{{reservation.reserve_date}}</li>
            <li class="list-group-item" style="width: 29rem">{{reservation.hours}}</li>
            <li class="list-group-item" v-if="reservation.reserve_status === 'pending'"><button type="button" class="btn btn-outline-warning">Pending</button></li>
            <li class="list-group-item" v-else-if="reservation.reserve_status === 'approved'"><span class="fw-normal" style="color: #22C55E">Approved</span></li>
            <li class="list-group-item" v-else-if="reservation.reserve_status === 'rejected'"><span class="fw-normal text-danger">Rejected</span></li>
        </ul>
    </div>

    
    
    <!-- blur bg -->
    <div class="circle1"></div>
    <div class="circle2"></div>

    <!-- incomplete toast -->
    <div class="position-fixed bottom-0 start-0 p-3" style="z-index: 11;">
      <div id="incompleteToast" class="toast hide bg-white" role="alert" aria-live="assertive" aria-atomic="true">
        <div class="toast-header text-white bg-danger fw-light">
          <span class="me-2"><i class="bi bi-exclamation-circle"></i></span>
          <strong class="me-auto">Incomplete</strong>
          <button type="button" class="btn-close" data-bs-dismiss="toast" aria-label="Close"></button>
        </div>
        <div class="toast-body text-danger text-start">
          Please fill out ''
        </div>
      </div>
    </div>
    
    <!-- success toast -->
    <div class="position-fixed bottom-0 start-0 p-3" style="z-index: 11;">
      <div id="successToast" class="toast hide bg-white" role="alert" aria-live="assertive" aria-atomic="true">
        <div class="toast-header text-white fw-light" style="background-color: #22C55E">
          <span class="me-2"><i class="bi bi-check-circle"></i></span>
          <strong class="me-auto">Success</strong>
          <button type="button" class="btn-close" data-bs-dismiss="toast" aria-label="Close"></button>
        </div>
        <div class="toast-body text-start" style="color: #22C55E">
          '' has been created!
        </div>
      </div>
    </div>

  </div>
</div>
</template>

<script>
import {} from 'bootstrap'
export default {
  name: 'ReservationList',
  data() {
    return {
        //array for reservation
        reservations: [
            {reserve_id: 1, inform_date: '20/04/2022', room_name: 'ห้องซ้อม P01', type_name: 'ห้องซ้อมดนตรี', room_price: 600, reserve_date: '27/04/2022', reserve_hours: [11, 12, 13], reserve_status: 'pending'},
            {reserve_id: 2, inform_date: '20/04/2022', room_name: 'ห้องซ้อม P02', type_name: 'ห้องซ้อมเต้น', room_price: 1800, reserve_date: '27/04/2022', reserve_hours: [14, 15, 16, 17, 18, 19], reserve_status: 'approved'},
            {reserve_id: 3, inform_date: '20/04/2022', room_name: 'ห้องซ้อม P03', type_name: 'ห้องอัดเสียง', room_price: 600, reserve_date: '27/04/2022', reserve_hours: [18, 19, 20], reserve_status: 'rejected'},
        ],
        //>>array for reservation

        selected_status: '',
    }
  },
  created() {
    //format hours
    let hours_concat = ''
    for(let index = 0; index < this.reservations.length; index++) {
        for (let i = 0; i < this.reservations[index].reserve_hours.length; i++) {
            hours_concat += this.reservations[index].reserve_hours[i] + '.00-' + (parseInt(this.reservations[index].reserve_hours[i])+1) + '.00, '
        }
        var result = hours_concat.substring(0, hours_concat.length-2);
        (this.reservations[index])['hours'] = result
        hours_concat = ''
    }
  },
  methods: {

  },
  computed: {
      filteredReservation() {
          let filter_reservation = []
          if(this.selected_status == 'pending'){
              filter_reservation = this.reservations.filter((val) => val.reserve_status == 'pending')
              return filter_reservation
          }else if(this.selected_status == 'approved'){
              filter_reservation = this.reservations.filter((val) => val.reserve_status == 'approved')
              return filter_reservation
          }else if(this.selected_status == 'rejected'){
              filter_reservation = this.reservations.filter((val) => val.reserve_status == 'rejected')
              return filter_reservation
          }else{
              return this.reservations
          }
      }
  }
  
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1 {
    color: white;
}
.status-bar {
  color: white;
  border-bottom: 1px solid white;
  width: 9rem;
  cursor: pointer;
}
.btn:focus{
    outline: 0 none !important;
}
.select-status-bar {
  color: #6366F1;
  border-bottom: 1px solid #6366F1;
  width: 9rem;
  cursor: pointer;
}
.btn-custom:active {
  color: #6366F1;
  border-bottom: 1px solid #6366F1;
}
.btn-custom:hover {
  color: #6366F1;
  border-bottom: 1px solid #6366F1;
}
.btn:focus {
  outline: none;
  box-shadow: none;
}
.btn-pri {
  background-color: #6366F1;
  color: white;
}
.btn-sec {
  color: #6366F1; 
  border-color: #6366F1
}
.btn-dis {
  color: #807B8A;
  background-color: #2A2838;
}
.res-list-group {
    border-bottom: 0.5px solid #5C5B64;
}
.res-list-group:hover {
    border-left: 1px solid #6366F1;
}
.list-group-item {
    width: 9rem;
    background: none;
    color: white;
}
.circle1 {
  position: absolute;
  width: 150px;
  height: 150px;
  left: 950px;
  top: 64px;

  background: #D647EF;
  mix-blend-mode: normal;
  filter: blur(135px);
}
.circle2 {
  position: absolute;
  width: 150px;
  height: 150px;
  left: 1175px;
  top: 220px;

  background: #6366F1;
  mix-blend-mode: normal;
  filter: blur(135px);
}
.linear-color {
  background: -webkit-linear-gradient(180deg, #d647ef, #6865f2);
  background-clip: text;
  -webkit-text-fill-color: transparent;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  background-color: #2A2838;
  color: #AFACB6;
  width: 440px;
  padding: 5px 5px 5px 5px;
}
</style>
