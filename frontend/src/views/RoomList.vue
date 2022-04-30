<template>
  <div class="container pt-5 mb-5">
      <div class="d-flex flex-row justify-content-between">
          <div class="text-start d-flex flex-row align-items-center ">
            <div class="linear-color h1" >Room List</div>
            <div class="mx-4 flex-row align-content-center align-item-center" ><a href="create-room"><button class="btn btn-custom" style="border-color:#6865F2; color: white; background-color: #6865F2;">Add a new room</button></a></div>
          </div>
          <div class="d-flex flex-row align-items-center justify-content-end w-50">
              <div class="col col-6 text-start">
                <div class="dropdown">
                  <button class="btn btn-lg dropdown-toggle w-100 text-end input-bg text-white" type="button" id="room_type" data-bs-toggle="dropdown" aria-expanded="false">
                    <span class="fw-light" style="float: left;">{{show_select_type}}</span>
                  </button>
                  <ul class="dropdown-menu" aria-labelledby="room_type">
                    <li style="width: 20rem" v-for="(type, index) in dropdown_room_type" :key="index"><button class="dropdown-item" type="button" @click="type_name, show_select_type = type.type_name">{{type.type_name}}</button></li>
                  </ul>
                </div>
            </div>
          </div>
      </div>
      <div class="row mt-5">
          <div class="col-6 pb-5" style="z-index: 2" v-for="(room, index) in all_room" :key="index" v-show="show_select_type == room.room_type || show_select_type == 'All type'">
            <a href="/room-detail" class="" style="text-decoration: none;">
              <div class="d-flex flex-row">
                <div class="d-flex" style="width: 33%; height: 17rem">
                  <img :src="require(`../assets/${room.room_image}`)" class="img-fluid" style="object-fit: cover" alt="">
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
                    <div class="text-white px-3">
                      <a href="/edit-room"><span type="button" class="btn btn-outline-warning"> Edit </span></a>
                      
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
          </a>
        </div>
      </div>
      <div class="circle1"></div>
    <div class="circle2"></div> 
  </div>
</template>

<script>
import {} from 'bootstrap'
export default {
  name: "RoomList",
  data () {
    return {
      //for drop down
      show_select_type: 'All type',
      dropdown_room_type: [
        {type_name: 'All type'},
        {type_name: 'ห้องซ้อมดนตรี'},
        {type_name: 'ห้องอัดเสียง'},
        {type_name: 'ห้องซ้อมเต้น'}
      ],
      room_name: '',
      type_name: '',
      //>>for drop down

      //for room
      all_room: [
        {
        room_name: "ห้องซ้อม P01",
        room_id:1,
        room_type: "ห้องอัดเสียง",
        room_status: "พร้อมใช้งาน",
        room_price: 300,
        room_image: '52Studio.jpeg',
        room_description:
          "Beside the Studio area we also have a private lounge for both Studio A and B, a courtyard with outdoor seating, and a big garden with bar and BBQ stove,…",
        },
        {
        room_name: "สตูดิโอ S01",
        room_id:1,
        room_type: "ห้องอัดเสียง",
        room_status: "ไม่พร้อมใช้งาน",
        room_price: 700,
        room_image: 'Background Color.jpeg',
        room_description:
          "Beside the Studio area we also have a private lounge for both Studio A and B, a courtyard with outdoor seating, and a big garden with bar and BBQ stove,…",
        },
        {
        room_name: "ห้องเต้น P02",
        room_id:2,
        room_type: "ห้องอัดเสียง",
        room_status: "พร้อมใช้งาน",
        room_price: 400,
        room_image: '52Studio.jpeg',
        room_description:
          "Beside the Studio area we also have a private lounge for both Studio A and B, a courtyard with outdoor seating, and a big garden with bar and BBQ stove,…",
        },
        {
        room_name: "ห้องซ้อม P04",
        room_id:1,
        room_type: "ห้องอัดเสียง",
        room_status: "ไม่พร้อมใช้งาน",
        room_price: 300,
        room_image: '52Studio.jpeg',
        room_description:
          "Beside the Studio area we also have a private lounge for both Studio A and B, a courtyard with outdoor seating, and a big garden with bar and BBQ stove,…",
        },
        {
        room_name: "ห้องซ้อม P046",
        room_id:1,
        room_type: "ห้องอัดเสียง",
        room_status: "ไม่พร้อมใช้งาน",
        room_price: 300,
        room_image: '52Studio.jpeg',
        room_description:
          "Beside the Studio area we also have a private lounge for both Studio A and B, a courtyard with outdoor seating, and a big garden with bar and BBQ stove,…",
        },
        {
        room_name: "ห้องซ้อม P045",
        room_id:1,
        room_type: "ห้องอัดเสียง",
        room_status: "ไม่พร้อมใช้งาน",
        room_price: 300,
        room_image: '52Studio.jpeg',
        room_description:
          "Beside the Studio area we also have a private lounge for both Studio A and B, a courtyard with outdoor seating, and a big garden with bar and BBQ stove,…",
        },
      ]
      //>> for room

    };
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