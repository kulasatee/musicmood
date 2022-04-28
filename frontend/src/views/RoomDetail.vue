<template>
  <div style="background-color: #131022" class="pb-5">
    <div class="row">
      <div class="container-fluid hero-image">
        <div style="height: 60vh"></div>
      </div>
    </div>
    <div class="container">
      <div class="row">
        <div class="col py-5 ps-0 text-start">
          <span
            class="h1 fw-bold py-1 pe-4 linear-color"
            style="
              border-right-style: solid;
              border-width: 2px;
              border-color: #afacb6;
              width: fit-content;
            "
          >
            {{ room.roomName }}</span
          >
          <span class="h2 ps-3 pe-3" style="color: #afacb6">
            {{ room.roomType }}</span
          >
          <span class="btn mb-3 pb-1 readystatus"> {{ room.roomStatus }}</span>
        </div>
      </div>
      <div class="row">
        <div class="col-7 ps-0 text-start">
          <h1 style="color: #ffffff">Room Description</h1>
          <p class="fw-light mt-3" style="color: #c4c4c4">
            {{ room.roomDescription }}
          </p>
          <h1 class="mt-5" style="color: #ffffff">This room includes:</h1>
          <div class="row fw-light mt-3">
            <div
              v-for="instru in instruments"
              :key="instru.id"
              class="col-6"
              style="color: #afacb6"
            >
              <p>
                <i class="bi bi-check-circle textpurple"></i>
                {{ instru.instrument_name }}
              </p>
            </div>
          </div>
          <div class="row mt-5">
            <div class="col text-center">
              <h1 style="color: #ffffff">{{ room.roomPrice }} บาท / ชั่วโมง</h1>
            </div>
          </div>
        </div>
        <div class="col"></div>
        <div
          class="p-5 card pb-5 col-4 text-start"
          style="
            background-color: #2a2838;
            border-width: 1px;
            border-color: #5c5b64;
          "
        >
          <div>
            <label style="color: #ffffff" for="reserve_date" class="form-label"
              >Select Date</label
            >
            <input
              type="date"
              class="form-control fw-light"
              id="reserve_date"
              placeholder="Example input placeholder"
              v-model="selectedDate"
              style="
                background-color: #2a2838;
                color: #ffffff;
                border-color: #5c5b64;
              "
            />
          </div>
          <div class="row">
            <div class="col-6 mt-2" v-for="time in timevalue" :key="time">
              <input
                :disabled="fetchTime.includes(time)"
                type="checkbox"
                class="btn-check"
                :id="'btn-check' + time"
                :value="time"
                v-model="selectedTime"
              />
              <label
                class="btn btn-custom w-100"
                v-bind:class="[
                  fetchTime.includes(time) ? disablebtn : activebtn,
                ]"
                :for="'btn-check' + time"
                >{{ time }}.00 - {{ time + 1 }}.00</label
              >
            </div>
          </div>
          <div class="col-12 mt-4 text-center">
            <span style="color: #ffffff">ราคาทั้งหมด</span>
          </div>
          <div class="col-12 mt-3 text-center">
            <h1 style="color: #ffffff">{{ totalPrice }} บาท</h1>
          </div>
          <div class="col-12 mt-3 text-center">
            <button  id="reserveButton" style="background-color:#6366f1" :disabled="(todayDate > selectedDate) || (fetchTime.length == 10) ? true : false" class="btn text-white">RESERVE</button>
          </div>
        </div>
      </div>
      <div class="row text-center mt-5">
        <h1 style="color: #ffffff">Gallery</h1>
      </div>
      <div class="row mt-3">
        <div v-for="image in roomImage" :key="image" class="col-3">
          <img
            :src="image"
            class="img-fluid rounded shadow-lg"
            alt="..."
            style="object-fit: cover; width: 100%; height: 15rem"
          />
        </div>
      </div>
      <div class="row mt-5">
        <div class="col-12">
          <div class="row text-start">
            <h1 class="text-white">{{ countComment }} comments</h1>
          </div>
        </div>
      </div>
      <!-- each comments -->
      <div
        v-for="comment in commentList"
        :key="comment.commentId"
        class="row text-start p-4"
        style="
          border-bottom-style: solid;
          border-width: 1px;
          border-color: #5c5b64;
        "
      >
        <div class="col-12 fs-4 text-white">
          {{ comment.commentBy }}
          <span class="fw-light fs-6 ms-2" style="color: #5c5b64">{{
            comment.commentDate
          }}</span>
          <span
            @click="showDeleteCommentModal(comment.commentBy, comment.commentId)"
            v-show="user.userId == comment.commentById"
            class="float-end bi bi-trash3 fs-6"
            style="color: #c4c4c4"
          ></span>
        </div>
        <div class="col-12 mt-2 fw-light" style="color: #c4c4c4">
          {{ comment.commentDetail }}
        </div>
      </div>
      <!-- delete modal -->
      <div class="modal" tabindex="-1" id="deleteModal">
        <div class="modal-dialog">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title">Delete Comment</h5>
              <button
                type="button"
                class="btn-close"
                aria-label="Close"
                @click="deleteCommentModal.hide()"
              ></button>
            </div>
            <div class="modal-body">
              <p>{{'Do you want to delete '+commentByToDelete+' comment?'}}</p>
            </div>
            <div class="modal-footer">
              <button
                type="button"
                class="btn btn-secondary"
                @click="deleteCommentModal.hide()"
              >
                Close
              </button>
              <button
                type="button"
                class="btn btn-danger"
                @click="deleteComment()"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { Modal } from "bootstrap";
export default {
  data() {
    return {
      user: {
        userId: 1,
        Name: "Salinya",
        LastName: "Timklip",
        phone: "080-123-4567",
      },
      room: {
        roomName: "ห้องซ้อม P01",
        roomType: "ห้องอัดเสียง",
        roomStatus: "พร้อมใช้งาน",
        roomPrice: 300,
        roomDescription:
          "Beside the Studio area we also have a private lounge for both Studio A and B, a courtyard with outdoor seating, and a big garden with bar and BBQ stove,…",
      },
      timevalue: [11, 12, 13, 14, 15, 16, 17, 18, 19, 20],
      selectedTime: [],
      fetchTime: [16, 17, 18, 19, 20],
      activebtn: "selecttimebtn",
      disablebtn: "selectedTimebtn",
      selectedDate: null,
      roomImage: [
        require("../assets/roomImage1.jpg"),
        require("../assets/roomImage2.jpg"),
        require("../assets/roomImage3.jpg"),
        require("../assets/roomImage4.jpg"),
      ],
      instruments: [
        { id: 1, quantity: 1, instrument_name: "1 VOX TELSTAR MAPLE (Drum)" },
        {
          id: 2,
          quantity: 2,
          instrument_name: "2 FENDER  STRATOCASTER JAPAN (Guitar)",
        },
        {
          id: 3,
          quantity: 2,
          instrument_name: "2 FENDER  STRATOCASTER JAPAN (Guitar)",
        },
        {
          id: 4,
          quantity: 2,
          instrument_name: "2 FENDER  STRATOCASTER JAPAN (Guitar)",
        },
        {
          id: 5,
          quantity: 2,
          instrument_name: "2 FENDER  STRATOCASTER JAPAN (Guitar)",
        },
        {
          id: 6,
          quantity: 2,
          instrument_name: "2 FENDER  STRATOCASTER JAPAN (Guitar)",
        },
        {
          id: 7,
          quantity: 2,
          instrument_name: "2 FENDER  STRATOCASTER JAPAN (Guitar)",
        },
        {
          id: 8,
          quantity: 2,
          instrument_name: "2 FENDER  STRATOCASTER JAPAN (Guitar)",
        },
        {
          id: 9,
          quantity: 2,
          instrument_name: "2 FENDER  STRATOCASTER JAPAN (Guitar)",
        },
        {
          id: 10,
          quantity: 2,
          instrument_name: "2 FENDER  STRATOCASTER JAPAN (Guitar)",
        },
      ],
      commentList: [
        {
          commentId: 1,
          commentBy: "Salinya Timklip",
          commentById: 1,
          commentDetail: "ดีดีดีดีดีดีดีดี",
          commentDate: "15-04-2022",
        },
        {
          commentId: 2,
          commentBy: "Chaiyawut RuenRueng",
          commentById: 2,
          commentDetail:
            "ดีมากครับ แอร์เย็น สะอาด ไม่อับ ไมค์ไม่จี่ ไม่เหม็นน้ำลาย",
          commentDate: "20-04-2022",
        },
      ],
      commentIdtoDelete: null,
      commentByToDelete: null,
      deleteCommentModal: null,
      todayDate: null,
    };
  },
  methods: {
    showDeleteCommentModal(commentBy, commentId) {
       this.deleteCommentModal = new Modal(document.getElementById("deleteModal"));
      this.deleteCommentModal.show();
      this.commentIdtoDelete = commentId;
      this.commentByToDelete = commentBy;
    },
    deleteComment() {
      let index = this.commentList.findIndex(
        (val) => val.commentId === this.commentIdtoDelete
      );
      this.commentList.splice(index, 1);
      this.deleteCommentModal.hide();
    },
  },
  created() {
    this.todayDate = new Date();
    var yyyy = this.todayDate.getFullYear();
    let mm = this.todayDate.getMonth() + 1; // Months start at 0!
    let dd = this.todayDate.getDate();

    if (dd < 10) dd = "0" + dd;
    if (mm < 10) mm = "0" + mm;

    this.todayDate = yyyy + "-" + mm + "-" + dd;

    return (this.selectedDate = this.todayDate);
  },
  computed: {
    totalPrice() {
      return this.selectedTime.length * this.room.roomPrice;
    },
    countComment() {
      return this.commentList.length;
    }
  },
};
</script>

<style scoped>
::-webkit-calendar-picker-indicator {
  filter: invert(1);
}
.circle1 {
  position: absolute;
  width: 150px;
  height: 150px;
  left: 950px;
  top: 64px;

  background: #d647ef;
  mix-blend-mode: normal;
  filter: blur(135px);
}
.circle2 {
  position: absolute;
  width: 150px;
  height: 150px;
  left: 1175px;
  top: 220px;

  background: #6366f1;
  mix-blend-mode: normal;
  filter: blur(135px);
}
input[type="checkbox"]:checked + label {
  background-color: #6366f1;
  color: #ffffff;
}
.selecttimebtn {
  border-color: #6366f1;
  color: #6366f1;
  background-color: #2a2838;
}
.selectedTimebtn {
  color: #807b8a;
  background-color: #2a2838;
}
.selecttimebtn:hover {
  background-color: #4044ee;
  color: #ffffff;
}
.textpurple {
  color: #6366f1;
}
.readystatus {
  cursor: context-menu;
  color: #22c55e;
  background-color: #2a2838;
}

.hero-image {
  /* Use "linear-gradient" to add a darken background effect to the image (photographer.jpg). This will make the text easier to read */
  background-image: url("../assets/banner.jpg");

  /* Set a specific height */

  /* Position and center the image to scale nicely on all screens */
  background-position: center;
  background-repeat: no-repeat;
  background-size: 100% auto;
  position: relative;
}

.linear-color {
  background: -webkit-linear-gradient(180deg, #d647ef, #6865f2);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}
</style>
