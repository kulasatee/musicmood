<template>
  <div style="background-color: #131022" class="pb-5">
    <div>
      <div class="container-fluid p-0" style="height: 60vh">
        <img class="w-100" :src="require(`../assets/${imageMain[0].source}`)" alt="" style="height: 60vh; object-fit: cover">
      </div>
    </div>
    <div class="container">
      <!-- first row -->
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
            {{ room.room_type }}</span
          >
          <span class="btn mb-3 pb-1 readystatus" :class="room.room_status == 'พร้อมใช้งาน' ? 'readystatus':'unreadystatus'">{{room.room_status}}</span>
          
          <span
            type="button"
            class="btn btn btn-outline-danger ms-3 mb-3 pb-1 float-end"
            @click="showDeleteRoomModal(room.room_id)"
          >
            Delete
          </span>
          <a href="/create-room"
            ><span
              type="button"
              class="btn btn-outline-warning mb-3 pb-1 float-end"
            >
              Edit
            </span></a
          >
           <span
            type="button"
            class="btn btn btn-outline-primary me-3 ms-3 mb-3 pb-1 float-end"
            @click="showReservationModal(room.room_id)"
          >
            Show
          </span>
        </div>
      </div>

      <!-- room detail -->
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

      </div>

      <!-- Gallery -->
      <div class="row text-center mt-5">
        <h1 style="color: #ffffff">Gallery</h1>
      </div>
      <!-- Gallery Image-->
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
            @click="
              showDeletereviewModal(review.reviewBy, review.reviewId)
            "
            class="float-end bi bi-trash3 fs-6"
            style="color: #c4c4c4; cursor: pointer"
          ></span>
        </div>
        <div class="col-12 mt-2 fw-light" style="color: #c4c4c4">
          {{ review.reviewDetail }}
        </div>
      </div>

      <!-- delete review modal -->
      <div
        class="modal fade"
        id="deletereviewModal"
        tabindex="-1"
        aria-hidden="true"
      >
        <div class="modal-dialog modal-dialog-centered">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title">Delete review</h5>
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

      <!-- delete room modal -->
      <div
        class="modal fade"
        id="deleteRoomModal"
        tabindex="-1"
        aria-hidden="true"
      >
        <div class="modal-dialog modal-dialog-centered">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title" >Delete Room</h5>
              <button
                type="button"
                class="btn-close"
                @click="deleteRoomModal.hide()"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div class="modal-body text-start">
              Are you sure you want to delete
              <span class="fw-bold">{{ room.room_name }}</span
              > ?
            </div>
            <div class="modal-footer">
              <button
                type="button"
                class="btn btn-outline-danger"
                @click="deleteRoomModal.hide()"
                data-bs-dismiss="modal"
              >
                CANCEL
              </button>
              <button
                type="button"
                class="btn btn-danger"
                @click="deleteRoom()"
              >
                DELETE
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
  name: "StaffRoomDetail",
  data() {
    return {
      user: {
        userId: 2,
        name: "Chaiyawat",
        lastName: "Roongrueng",
        phone: "080-123-4567",
      },
      room: {
        room_id: 1,
        room_name: "ห้องซ้อม P01",
        type_name: "ห้องอัดเสียง",
        room_status: "ไม่พร้อมใช้งาน",
        room_price: 300,
        room_description:
          "Beside the Studio area we also have a private lounge for both Studio A and B, a courtyard with outdoor seating, and a big garden with bar and BBQ stove,…",
        room_image: [
        {source: "banner.jpg", main: 1},
        {source: "roomImage1.jpg", main: 0},
        {source: "roomImage2.jpg", main: 0},
        {source: "roomImage3.jpg", main: 0},
        {source: "roomImage4.jpg", main: 0}
      ]
      },
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
      reservation:{reserve_id: 3, inform_date: '20/04/2022', room_name: 'ห้องซ้อม P03', type_name: 'ห้องอัดเสียง', room_price: 600, reserve_date: '27/04/2022', reserve_hours: [18, 19, 20], reserve_status: 'rejected', reserve_remark: 'ร้านปิดให้บริการเนื่องจากวันสงกรานต์'},
      reviewIdtoDelete: null,
      reviewByToDelete: null,
      deletereviewModal: null,
      deleteRoomModal: null,
      roomIdtoDelete: null,
      todayDate: null,
      imageNonMain: [],
      imageMain: [],

    };
  },
  methods: {
    showDeletereviewModal(reviewBy, reviewId) {
      // if(this.deletereviewToast != null){
      //   this.deletereviewToast.hide();
      // }
      this.deletereviewModal = new Modal(
        document.getElementById("deletereviewModal")
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
    showDeleteRoomModal(room_id) {
      this.deleteRoomModal = new Modal(
        document.getElementById("deleteRoomModal")
      );
      this.deleteRoomModal.show();
      this.roomIdtoDelete = room_id;
    },
    deleteRoom() {
      this.deleteRoomModal.hide();
      this.$router.push("/room-list")
      this.$toast.success(`${this.room.room_name} has been deleted`)
    }
  },
  created() {
    this.imageNonMain = this.room.room_image.filter((val) => val.main == 0);
    this.imageMain = this.room.room_image.filter((val) => val.main == 1);
  },
  computed: {
    countreview() {
      return this.reviewList.length;
    }
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
input[type="checkbox"]:checked + label {
  background-color: #6366f1;
  color: #ffffff;
}
.selecttimebtn{
  background-color: #6865F2;
  color: #ffffff;
}
.textpurple {
  color: #6366f1;
}
.readystatus {
  cursor: default;
  color: #22c55e;
  background-color: #2a2838;
}
.unreadystatus {
  cursor: default;
  color: #AFACB6;
  background-color: #2A2838;
}


.hero-image {
  /* Use "linear-gradient" to add a darken background effect to the image (photographer.jpg). This will make the text easier to read */
  /* background-image: url("../assets/banner.jpg"); */

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
