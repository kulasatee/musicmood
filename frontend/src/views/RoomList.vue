<template>
  
  <div class="container mb-5">
      <div class="d-flex flex-row justify-content-between">
          <div class="text-start d-flex flex-row align-items-center ">
            <div class="linear-color h1" >Room List</div>
            <div v-if="user.role != 'customer' && user.role != 'anonymous'" class="mx-4 flex-row align-content-center align-item-center" ><router-link to="create-room"><button class="btn btn-custom" style="border-color:#6865F2; color: white; background-color: #6865F2;">Add a new room</button></router-link></div>
          </div>
          <div class="d-flex flex-row align-items-center justify-content-end w-50">
              <div class="col text-start">
                <div class="dropdown">
                  <button class="btn btn-lg dropdown-toggle w-100 text-end input-bg text-white" type="button" id="room_type" data-bs-toggle="dropdown" aria-expanded="false">
                    <span class="fw-light" style="float: left;">{{show_select_type}}</span>
                  </button>
                  <ul class="dropdown-menu" aria-labelledby="room_type">
                    <li style="width: 20rem" v-for="(type, index) in dropdown_room_type" :key="index"><button class="dropdown-item" type="button" @click="show_select_type = type.type_name">{{type.type_name}}</button></li>
                  </ul>
                </div>
            </div>
            <div class="ms-2 col text-start">
                <div class="dropdown">
                  <button class="btn btn-lg dropdown-toggle w-100 text-end input-bg text-white" type="button" id="room_status" data-bs-toggle="dropdown" aria-expanded="false">
                    <span class="fw-light" style="float: left;">{{show_select_status}}</span>
                  </button>
                  <ul class="dropdown-menu" aria-labelledby="room_status">
                    <li style="width: 20rem" v-for="(status, index) in dropdown_room_status" :key="index"><button class="dropdown-item" type="button" @click="show_select_status = status.status_name">{{status.status_name}}</button></li>
                  </ul>
                </div>
            </div>
          </div>
      </div>
      <div class="row mt-5">
          <div class="col-6 pb-5" style="z-index: 2" v-for="(room, index) in filter_room" :key="index">
            <!-- <a href="/room-detail" class="" style="text-decoration: none;"> -->
            <router-link :to="{ path: `/room-detail/${room.room_id}`}" style="text-decoration: none">
              <div class="d-flex flex-row">
                <div class="d-flex" style="width: 33%; height: 17rem">
                  <img :src="`http://localhost:3001/${room.file_path}`" class="img-fluid rounded" style="object-fit: cover" alt="">
                </div>
                <div class="d-flex flex-column rounded" style="width: 67%; height: 17rem; background-color: #1F1C2D">
                  <div class="d-flex flex-row align-items-center justify-content-between">
                    <div class="d-flex flex-row pt-2 align-items-center">
                        <div class="h5 px-3 py-1 text-white" style="
                                border-right-style: solid;
                                border-width: 2px;
                                border-color: #afacb6;
                                width: fit-content;
                              ">
                        {{room.room_name}}
                      </div>
                      <div class="h6 fw-light p-3 text-white">
                        {{room.room_type}}
                      </div>
                    </div>
                    <div v-if="user.role != 'customer' && user.role != 'anonymous'"  class="text-white px-3">
                      <router-link :to="`/edit-room/${room.room_id}`"><span type="button" class="btn btn-outline-warning"> Edit </span></router-link>
                    </div>
                  </div>
                  <div class="d-flex flex-column align-items-start">
                    <div class="h3 px-3 text-white">
                      <span class="btn mb-3 pb-1 readystatus" :class="room.room_status == 'พร้อมใช้งาน' ? 'readystatus':'unreadystatus'">{{room.room_status}}</span>
                    </div>
                    <div class="fw-light px-3 text-start text-white">
                        {{room.room_description}}
                    </div>
                    <div class="h4 fw-bold px-3 pt-4 text-start text-white">
                      {{room.room_price}} บาท / ชั่วโมง
                    </div>
                  </div>
                </div>
              </div>
          </router-link>
        </div>
      </div>
      <div class="circle1"></div>
    <div class="circle2"></div> 
  </div>
</template>

<script>
import {} from 'bootstrap'
import axios from "../plugins/axios";
export default {
  name: "RoomList",
  data () {
    return {
      user: {
        customer_id: 2,
        phone: "0812345678",
        role: "staff",
      },
      //for drop down
      show_select_type: 'All type',
      show_select_status: 'All status',
      dropdown_room_type: [
        {type_name: 'All type'},
        {type_name: 'ห้องซ้อมดนตรี'},
        {type_name: 'ห้องอัดเสียง'},
        {type_name: 'ห้องซ้อมเต้น'}
      ],
      dropdown_room_status: [
        {status_name: 'All status'},
        {status_name: 'พร้อมใช้งาน'},
        {status_name: 'ไม่พร้อมใช้งาน'}
      ],
      room_name: '',
      type_name: '',
      room_list:[]
    };
  },
  computed: {
    filter_room(){
      if(this.show_select_type == 'All type' && this.show_select_status == 'All status'){
        return this.room_list
      }else if(this.show_select_type == 'All type'){
        return this.room_list.filter((val) => val.room_status == this.show_select_status)
      }else if(this.show_select_status == 'All status'){
        return this.room_list.filter((val) => val.room_type == this.show_select_type)
      }else{
        return this.room_list.filter((val) => (val.room_type == this.show_select_type) && (val.room_status == this.show_select_status))
      }

    }
  },
  created(){
    axios.get("/rooms/banner")
      .then((response) => {
        console.log(response.data);
        this.room_list = response.data.rooms;
        if(JSON.parse(localStorage.getItem("user")) == null){
          this.user = {
            role: "anonymous",
          }
        }else{
          this.user = JSON.parse(localStorage.getItem("user"))
        }
      })
      .catch((err) => {
        console.log(err.response.data);
      });
  }
};
</script>

<style scoped>
p {
  font-size: 2em;
  text-align: center;
}
.dropdown-item {
  color: white
}
.readystatus {
  cursor: default;
  color: #22c55e;
  background-color: #2a2838;
}
.unreadystatus {
  cursor: default;
  color: #AFACB6;
  background-color: #2a2838;
}
  .circle1 {
    position: absolute;
    width: 10rem;
    height: 10rem;
    left: 60rem;
    top: 15rem;
  
    background: #D647EF;
    mix-blend-mode: normal;
    filter: blur(135px);
  }
  .circle2 {
    position: absolute;
    width: 10rem;
    height: 10rem;
    left: 73rem;
    top: 22rem;
  
    background: #6366F1;
    mix-blend-mode: normal;
    filter: blur(135px);
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
input:focus {
    background-color: #1F1C2D;
    color: white;
  }
input::placeholder{
  color: #C4C4C4;
  font-weight: 300;
}
</style>