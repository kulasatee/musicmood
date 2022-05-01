<template >
<div style="background-color: #131022; height: 100vh;">
  <div class="container pt-2" style="background-color: #131022;">
    <h1 class="text-start fw-bold mb-4">Create New Room</h1>
    <form class="row">
      <div class="row" style="z-index: 1">
        <!-- spilt 2 column -->
        <!-- left column -->
        <div class="col" >
          <div class="row mb-4">
            <div class="col col-6 text-start">
                <label for="roomname" class="form-label text-white">Room Name</label>
                <input type="text" class="form-control form-control-lg input-bg " id="roomname" v-model="room_name">
            </div>
            <div class="col col-6 text-start">
                <label for="roomtype" class="form-label text-white">Room Type</label>
                <div class="dropdown">
                  <button class="btn btn-lg dropdown-toggle w-100 text-end input-bg text-white" type="button" id="roomtype" data-bs-toggle="dropdown" aria-expanded="false">
                    <span class="fw-light" style="float: left;">{{show_select_type}}</span>
                  </button>
                  <ul class="dropdown-menu" aria-labelledby="roomtype">
                    <li style="width: 18rem" v-for="type in dropdown_room_type" :key="type.type_name"><button class="dropdown-item" type="button" @click="type_name = type.type_name, show_select_type = type.type_name">{{type.type_name}}</button></li>
                  </ul>
                </div>
            </div>
          </div>
          <div class="row mb-4">
            <div class="col col-6 text-start">
                <label for="roomstatus" class="form-label text-white">Room Status</label>
                <div class="dropdown">
                  <button class="btn btn-lg dropdown-toggle w-100 text-end text-white input-bg" type="button" id="roomstatus" data-bs-toggle="dropdown" aria-expanded="false">
                    <span class="fw-light" style="float: left;">{{show_select_status}}</span>
                  </button>
                  <ul class="dropdown-menu" aria-labelledby="roomstatus">
                    <li style="width: 290px" v-for="status in dropdown_room_status" :key="status.room_status"><button class="dropdown-item" type="button" @click="room_status = status.room_status, show_select_status = status.room_status">{{status.room_status}}</button></li>
                  </ul>
                </div>
            </div>
            <div class="col col-6 text-start">
                <label for="roomname" class="form-label text-white">Room Price</label>
                <input type="number" min="0" class="form-control form-control-lg input-bg" id="roomname" v-model="room_price">
            </div>
          </div>
          <div class="row mb-4">
            <div class="col text-start">
              <label for="roomdescription" class="form-label text-white">Room Description</label>
              <textarea class="form-control form-control-lg input-bg" rows="5" aria-label="Room Description" placeholder="Write a Room Description" v-model="room_description"></textarea>
            </div>
          </div>
          <div class="row mb-4">
            <div class="col text-start">
              <label for="bannerphoto" class="form-label text-white">Choose Banner photo</label>
              <input class="form-control form-control-lg text-white input-bg" type="file" id="bannerphoto">
            </div>
          </div>
          <div class="row">
            <div class="col text-start">
              <label for="roomphoto" class="form-label text-white">Choose Room photo (Maximum of 4)</label>
              <input class="form-control form-control-lg text-white input-bg" type="file" id="roomphoto" multiple>
            </div>
          </div>
        </div>
        
        <!-- right column -->
        <div class="col ms-5">
          <div class="row mb-2">
            <div class="col col-2 text-start">
              <label for="quantity" class="form-label text-white">Quantity</label>
              <input type="number" min="1" class="form-control form-control-lg input-bg" :class="isInputDisabled? 'input-dis':''" :disabled="isInputDisabled" id="quantity" v-model="quantity">
            </div>
            <div class="col text-start">
              <label for="instrument" class="form-label text-white">Room Instrument (Maximum of 10)</label>
              <input type="text" class="form-control form-control-lg input-bg" :class="isInputDisabled? 'input-dis':''" :disabled="isInputDisabled" id="instrument" v-model="instrument_name">
              <p class="mt-2" style="color: #AFACB6">e.g. Fender Stratocaster (Guitar)</p>
            </div>
            <div class="col col-3 text-start pt-2">
              <button type="button" class="btn btn-lg mt-4" :class="isBtnDisabled? 'btn-dis':'btn-sec'" :disabled="isBtnDisabled" @click="addInstrument()">Add</button>
            </div>
          </div>
          <div class="row ">
            <ul class="ps-3">
              <li class="text-start ps-3 mb-3" v-for="instrument in instruments" :key="instrument.id">
                {{ instrument.quantity }} {{ instrument.instrument_name }}
                <a href="#" @click="removeInstrument(instrument.instrument_id)">
                  <span style="color: white; float: right">
                    <i class="bi bi-x"></i>
                  </span>
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <div class="row h-25">
        <!-- submit form button -->
          <div class="col pt-2 text-end me-5">
            <button type="button" class="btn btn-lg btn-sec">CANCEL</button>
            <button type="button" class="btn btn-lg btn-pri ms-4" @click="addRoom()">CREATE ROOM</button>
          </div>
      </div>
    </form>
    
    <!-- blur bg -->
    <div class="circle1"></div>
    <div class="circle2"></div>
  </div>
</div>
</template>

<script>
import {} from 'bootstrap'
export default {
  name: 'CreateRoom',
  data() {
    return {
      //for dropdown
      show_select_type: '',
      show_select_status: '',
      dropdown_room_type: [
        {type_name: 'ห้องซ้อมดนตรี'},
        {type_name: 'ห้องอัดเสียง'},
        {type_name: 'ห้องซ้อมเต้น'}
      ],
      dropdown_room_status: [
        {room_status: 'พร้อมใช้งาน'},
        {room_status: 'ไม่พร้อมใช้งาน'}
      ],
      //>>for dropdown

      //v-model for input
      room_id: 0,
      room_name: '',
      type_name: '',
      room_status: '',
      room_price: '',
      room_description: '',
      banner: '',
      room_photo: '',
      quantity: '',
      instrument_name: '',
      //>>v-model for input

      //array for add new room
      rooms: [],
      //>>array for add new room
      
      //array for instrument
      instrument_id: 0,
      instruments: [],
      //>>array for instrument
    }
  },
  created() {
    this.room_id = this.rooms.length
    this.instrument_id = this.instruments.length
  },
  methods: {
    addRoom() {
      this.room_id++
      const newRoom = {
        room_id: this.room_id,
        room_name: this.room_name,
        type_name: this.type_name,
        room_status: this.room_status,
        room_price: this.room_price,
        room_description: this.room_description,
        banner: '',
        room_photo: '',
        room_instrument: this.instruments
      }

      if(!this.room_name){
        this.$toast.error(`Please fill out 'Room Name'`)   
      }else if(!this.type_name){
        this.$toast.error(`Please fill out 'Room Type'`)   
      }else if(!this.room_status){
        this.$toast.error(`Please fill out 'Room Status'`)   
      }else if(!this.room_price){
        this.$toast.error(`Please fill out 'Room Price'`)   
      }else if(!this.room_description){
        this.$toast.error(`Please fill out 'Room Description'`)   
      }else{
        this.rooms.push(newRoom)
        
        this.$toast.success(`'${this.room_name}' has been created!`)

        this.room_id = 0
        this.room_name = ''
        this.type_name = ''
        this.room_status = ''
        this.room_price = ''
        this.room_description = ''
        this.banner = ''
        this.room_photo = ''
        this.quantity = ''
        this.instrument_name = ''
        this.instruments = []
        this.show_select_type = ''
        this.show_select_status = ''
      }
    },
    addInstrument() {
      this.instrument_id++
      const newInstrument = {
        instrument: this.instrument_id,
        quantity: this.quantity,
        instrument_name: this.instrument_name 
      }

      this.instruments.push(newInstrument)

      this.quantity = ''
      this.instrument_name = ''
    },
    removeInstrument(instrument_id) {
      let index = this.instruments.findIndex((val) => val.instrument_id === instrument_id)
      this.instruments.splice(index, 1)
    }
  },
  computed: {
    isBtnDisabled() {
      if(this.quantity === '' || this.instrument_name === ''){
        return true
      }else if(this.instruments.length === 10){
        return true
      }else{
        return false
      }
    },
    isInputDisabled() {
      if(this.instruments.length === 10){
        return true
      }else{
        return false
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
.input-bg {
  background-color: #1F1C2D; 
  border-color: #5C5B64;
  border-width: 0.5px;
  color: white;
}
input:focus {
  background-color: #1F1C2D;
  color: white;
}
.input-dis {
  border: none;
}
textarea:focus {
  background-color: #1F1C2D;
  color: white;
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
.dropdown-item {
  color: white
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
.dropdown-item:hover {
  color: white;
  background-color: #6366F1;
}
</style>
