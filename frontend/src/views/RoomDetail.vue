<template>
  <div style="background-color: #131022" class="pb-5">
    <div>
      <div class="container-fluid p-0" style="height: 60vh">
        <img
          class="w-100"
          :src="require(`../assets/${imageMain[0].source}`)"
          alt=""
          style="height: 60vh; object-fit: cover"
        />
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
            {{ room.room_name }}</span
          >
          <span class="h2 ps-3 pe-3" style="color: #afacb6">
            {{ room.type_name }}</span
          >
          <span
            class="btn mb-3 pb-1 readystatus"
            :class="
              room.room_status == 'พร้อมใช้งาน'
                ? 'readystatus'
                : 'unreadystatus'
            "
            >{{ room.room_status }}</span
          >
        </div>
      </div>
      <div class="row">
        <div class="col-7 ps-0 text-start">
          <h1 style="color: #ffffff">Room Description</h1>
          <p class="fw-light mt-3" style="color: #c4c4c4">
            {{ room.room_description }}
          </p>
          <h1 class="mt-5" style="color: #ffffff">This room includes:</h1>
          <div class="row fw-light mt-3">
            <div
              v-for="(instru, index) in instruments"
              :key="index"
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
              <h1 style="color: #ffffff">
                {{ room.room_price }} บาท / ชั่วโมง
              </h1>
            </div>
          </div>
        </div>
        <div class="col"></div>

        <!-- reservation input -->
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
              v-model="reserve_date"
              style="
                background-color: #2a2838;
                color: #ffffff;
                border-color: #5c5b64;
              "
            />
          </div>
          <div class="row">
            <div class="col-6 mt-2" v-for="(time, index) in time_value" :key="index">
              <input
                :disabled="
                  reserved_hour.includes(time) || todayDate > reserve_date
                "
                type="checkbox"
                class="btn-check"
                :id="'btn-check' + time"
                :value="time"
                v-model="reserve_hour"
              />
              <label
                class="btn btn-custom w-100"
                v-bind:class="[
                  reserved_hour.includes(time) || todayDate > reserve_date
                    ? disablebtn
                    : activebtn,
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
            <button
              @click="showReserveModal"
              id="reserveButton"
              style="background-color: #6366f1"
              :disabled="
                todayDate > reserve_date ||
                reserved_hour.length == 10 ||
                reserve_hour.length == 0 ||
                room.room_status == 'ไม่พร้อมใช้งาน'
                  ? true
                  : false
              "
              class="btn text-white"
            >
              RESERVE
            </button>
          </div>
        </div>
      </div>

      <!-- Gallery -->
      <div class="row text-center mt-5">
        <h1 style="color: #ffffff">Gallery</h1>
      </div>
      <div class="row mt-3">
        <div v-for="(image, index) in imageNonMain" :key="index" class="col-3">
          <img
            :src="require(`../assets/${image.source}`)"
            class="img-fluid rounded shadow-lg"
            alt="..."
            style="object-fit: cover; width: 100%; height: 15rem"
          />
        </div>
      </div>

      <!-- Write Review -->
      <div class="text-start">
        <div class="row mt-5">
          <h1 style="color: #ffffff">Write a review</h1>
        </div>
        <div class="col-12 fs-4 p-4 text-white">
          {{ user.Name + " " + user.LastName }}
          <span class="fw-light fs-6 ms-2" style="color: #5c5b64">{{
            todayDate
          }}</span>
        </div>
        <div class="col-12 mt-2 fw-light ps-4" style="color: #c4c4c4">
          <textarea
            class="form-control"
            placeholder="Leave a review here"
            id="floatingTextarea2"
            style="height: 100px"
            v-model="new_review"
          ></textarea>
          <label for="floatingTextarea2"></label>
        </div>
        <div class="col-12">
          <button class="btn btn-purple float-end" @click="postReview()">Post review</button>
        </div>
      </div>

      <!-- count review -->
      <div class="row mt-5">
        <div class="col-12">
          <div class="row text-start">
            <h1 class="text-white">{{ countreview }} reviews</h1>
          </div>
        </div>
      </div>
      <!-- each reviews -->
      <div
        v-for="(review, index) in reviewList"
        :key="index"
        class="row text-start p-4"
        style="
          border-bottom-style: solid;
          border-width: 1px;
          border-color: #5c5b64;
        "
      >
        <div class="col-12 fs-4 text-white">
          {{ review.reviewBy }}
          <span class="fw-light fs-6 ms-2" style="color: #5c5b64">{{
            review.reviewDate
          }}</span>
          <span
            @click="showDeletereviewModal(review.reviewBy, review.reviewId)"
            v-show="user.userId == review.reviewById"
            class="float-end bi bi-trash3 fs-6"
            style="color: #c4c4c4; cursor: pointer"
          ></span>
        </div>
        <div class="col-12 mt-2 fw-light" style="color: #c4c4c4">
          {{ review.reviewDetail }}
        </div>
      </div>

      <!-- delete modal -->
      <div
        class="modal fade"
        id="deleteModal"
        tabindex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div class="modal-dialog modal-dialog-centered">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title" id="exampleModalLabel">Delete review</h5>
              <button
                type="button"
                class="btn-close"
                @click="deletereviewModal.hide()"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div class="modal-body text-start">
              Are you sure you want to delete
              <span class="fw-bold">{{ reviewByToDelete }}</span
              >'s review ?
            </div>
            <div class="modal-footer">
              <button
                type="button"
                class="btn btn-outline-danger"
                @click="deletereviewModal.hide()"
                data-bs-dismiss="modal"
              >
                CANCEL
              </button>
              <button
                type="button"
                class="btn btn-danger"
                @click="deletereview()"
              >
                DELETE
              </button>
            </div>
          </div>
        </div>
      </div>

      <!-- reserve modal -->
      <div
        class="modal fade"
        id="reserveModal"
        tabindex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div class="modal-dialog modal-dialog-centered">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title" id="exampleModalLabel">
                <span><i class="bi bi-info-circle"></i></span> Information
              </h5>
              <button
                type="button"
                class="btn-close"
                @click="reserveModal.hide()"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div class="modal-body text-start">
              This room can be used when this reservation status is
              <span class="fw-bold">Approved</span>. You can check your
              reservation status at
              <span class="fw-bold">Reservation Status tab</span>
            </div>
            <div class="modal-footer">
              <button
                type="button"
                class="btn btn-outline-purple"
                @click="reserveModal.hide()"
                data-bs-dismiss="modal"
              >
                CANCEL
              </button>
              <button
                type="button"
                class="btn btn-purple"
                @click="reserveRoom()"
              >
                RESERVE
              </button>
            </div>
          </div>
        </div>
      </div>

      <!-- reserve toast -->
      <div class="position-fixed bottom-0 start-0 p-3" style="z-index: 11">
        <div
          id="reserveToast"
          class="toast hide bg-white"
          role="alert"
          aria-live="assertive"
          aria-atomic="true"
        >
          <div
            class="toast-header text-white fw-light"
            style="background-color: #22c55e"
          >
            <span class="me-2"><i class="bi bi-check-circle"></i></span>
            <strong class="me-auto">Success</strong>
            <button
              type="button"
              class="btn-close"
              data-bs-dismiss="toast"
              aria-label="Close"
            ></button>
          </div>
          <div class="toast-body text-start" style="color: #22c55e">
            Your Reservation has been sent!
          </div>
        </div>
      </div>

      <!-- delete review toast -->
      <div class="position-fixed bottom-0 start-0 p-3" style="z-index: 11">
        <div
          id="deletereviewToast"
          class="toast hide bg-white"
          role="alert"
          aria-live="assertive"
          aria-atomic="true"
        >
          <div
            class="toast-header text-white fw-light"
            style="background-color: #22c55e"
          >
            <span class="me-2"><i class="bi bi-check-circle"></i></span>
            <strong class="me-auto">Success</strong>
            <button
              type="button"
              class="btn-close"
              data-bs-dismiss="toast"
              aria-label="Close"
            ></button>
          </div>
          <div class="toast-body text-start fw-light" style="color: #22c55e">
            <span class="fw-normal">{{ reviewByToDelete }}</span
            >'s review has been deleted!
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { Modal } from "bootstrap";
export default {
  name: "RoomDetail",
  data() {
    return {
      user: {
        userId: 2,
        Name: "Chaiyawat",
        LastName: "Roongrueng",
        phone: "080-123-4567",
      },
      room: {
        room_id: 1,
        room_name: "ห้องซ้อม P01",
        type_name: "ห้องอัดเสียง",
        room_status: "พร้อมใช้งาน",
        room_price: 300,
        room_description:
          "Beside the Studio area we also have a private lounge for both Studio A and B, a courtyard with outdoor seating, and a big garden with bar and BBQ stove,…",
        room_image: [
          { source: "banner.jpg", main: 1 },
          { source: "roomImage1.jpg", main: 0 },
          { source: "roomImage2.jpg", main: 0 },
          { source: "roomImage3.jpg", main: 0 },
          { source: "roomImage4.jpg", main: 0 },
        ],
      },
      time_value: [11, 12, 13, 14, 15, 16, 17, 18, 19, 20],
      reserve_hour: [],
      reserved_hour: [16, 17, 18, 19, 20],
      activebtn: "selecttimebtn",
      disablebtn: "reserve_hourbtn",
      reserve_date: null,
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
      reviewList: [
        {
          reviewId: 1,
          reviewBy: "Salinya Timklip",
          reviewById: 1,
          reviewDetail: "ดีดีดีดีดีดีดีดี",
          reviewDate: "15-04-2022",
        },
        {
          reviewId: 2,
          reviewBy: "Chaiyawat Roongrueng",
          reviewById: 2,
          reviewDetail:
            "ดีมากครับ แอร์เย็น สะอาด ไม่อับ ไมค์ไม่จี่ ไม่เหม็นน้ำลาย",
          reviewDate: "20-04-2022",
        },
        {
          reviewId: 3,
          reviewBy: "Kulasatee Dul",
          reviewById: 3,
          reviewDetail: "พนักงานบริการดี เป็นกันเองค่ะ แต่แอร์ดังไปหน่อยค่ะ",
          reviewDate: "28-04-2022",
        },
      ],
      reviewIdtoDelete: null,
      reviewByToDelete: null,
      deletereviewModal: null,
      todayDate: null,
      reserveModal: null,
      imageNonMain: [],
      imageMain: [],
      new_review: "",
    };
  },
  methods: {
    postReview(){
      if(this.new_review == ""){
        this.$toast.warning("Please write something in your review!")
      }
      else if(this.reviewList.findIndex((review) => review.reviewById == this.user.userId) != -1){
        this.$toast.error("You have reviewed this room already!")
      }
      else if(this.reviewList.findIndex((review) => review.reviewById == this.user.userId) == -1){
        this.reviewList.push({
          reviewId: 0,
          reviewBy: this.user.Name + ' ' + this.user.LastName,
          reviewById: this.user.userId,
          reviewDetail: this.new_review,
          reviewDate: this.todayDate,
        },)
        this.$toast.success("Your review has been post!")
      }
      
    },
    showDeletereviewModal(reviewBy, reviewId) {
      this.deletereviewModal = new Modal(
        document.getElementById("deleteModal")
      );
      this.deletereviewModal.show();
      this.reviewIdtoDelete = reviewId;
      this.reviewByToDelete = reviewBy;
    },
    deletereview() {
      let index = this.reviewList.findIndex(
        (val) => val.reviewId === this.reviewIdtoDelete
      );
      this.reviewList.splice(index, 1);
      this.deletereviewModal.hide();
      this.$toast.success(`${this.reviewByToDelete}'s review has been deleted!`)
    },
    showReserveModal() {
      this.reserveModal = new Modal(document.getElementById("reserveModal"));
      this.reserveModal.show();
    },
    reserveRoom() {
      console.log("Room ... has been reserved.");
      this.reserveModal.hide();
      this.$toast.success("Your reservation has been sent!")
    }
  },
  created() {
    this.todayDate = new Date();
    var yyyy = this.todayDate.getFullYear();
    let mm = this.todayDate.getMonth() + 1; // Months start at 0!
    let dd = this.todayDate.getDate();

    if (dd < 10) dd = "0" + dd;
    if (mm < 10) mm = "0" + mm;

    this.todayDate = yyyy + "-" + mm + "-" + dd;

    this.reserve_date = this.todayDate;

    this.imageNonMain = this.room.room_image.filter((val) => val.main == 0);
    this.imageMain = this.room.room_image.filter((val) => val.main == 1);
  },
  computed: {
    totalPrice() {
      return this.reserve_hour.length * this.room.room_price;
    },
    countreview() {
      return this.reviewList.length;
    },
  },
};
</script>

<style scoped>
::-webkit-calendar-picker-indicator {
  filter: invert(1);
}
.btn-outline-purple {
  border-color: #6366f1;
  color: #6366f1;
  background-color: #ffffff;
}
.btn-purple {
  background-color: #6366f1;
  color: #ffffff;
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
.reserve_hourbtn {
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
.unreadystatus {
  cursor: default;
  color: #afacb6;
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
