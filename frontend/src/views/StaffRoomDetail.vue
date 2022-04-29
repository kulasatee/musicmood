<template>
  <div style="background-color: #131022" class="pb-5">
    <div>
      <div class="container-fluid p-0" style="height: 60vh">
        <img class="bg-danger w-100" :src="require(`../assets/${imageMain[0].source}`)" alt="" style="height: 60vh; object-fit: cover">
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
            <h1 class="text-white">{{ countComment }} comments</h1>
          </div>
        </div>
      </div>
      <!-- each comments -->
      <div
        v-for="(comment, index) in commentList"
        :key="index"
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
            @click="
              showDeleteCommentModal(comment.commentBy, comment.commentId)
            "
            class="float-end bi bi-trash3 fs-6"
            style="color: #c4c4c4; cursor: pointer"
          ></span>
        </div>
        <div class="col-12 mt-2 fw-light" style="color: #c4c4c4">
          {{ comment.commentDetail }}
        </div>
      </div>

      <!-- delete comment modal -->
      <div
        class="modal fade"
        id="deleteCommentModal"
        tabindex="-1"
        aria-hidden="true"
      >
        <div class="modal-dialog modal-dialog-centered">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title">Delete Comment</h5>
              <button
                type="button"
                class="btn-close"
                @click="deleteCommentModal.hide()"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div class="modal-body text-start">
              Are you sure you want to delete
              <span class="fw-bold">{{ commentByToDelete }}</span
              >'s comment ?
            </div>
            <div class="modal-footer">
              <button
                type="button"
                class="btn btn-outline-danger"
                @click="deleteCommentModal.hide()"
                data-bs-dismiss="modal"
              >
                CANCEL
              </button>
              <button
                type="button"
                class="btn btn-danger"
                @click="deleteComment()"
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

      <!-- delete comment toast -->
      <div class="position-fixed bottom-0 start-0 p-3" style="z-index: 11">
        <div
          id="deleteCommentToast"
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
            <span class="fw-normal">{{ commentByToDelete }}</span
            >'s comment has been deleted!
          </div>
        </div>
      </div>

      <!-- reservation modal -->
      <div
        class="modal fade"
        id="reservationModal"
        tabindex="-1"
        aria-hidden="true"
      >
        <div class="modal-dialog modal-dialog-centered">
          <div class="modal-content">
            <div class="modal-header">
              <span class="modal-title fs-3">{{reservation.room_name}}</span><span class="ms-3 fw-light">Created Date: {{reservation.inform_date}}</span> 
              <button v-if="reservation.reserve_status == 'pending'" type="button" disabled class="btn btn-warning btn-sm ms-3">Pending</button>
              <button v-if="reservation.reserve_status == 'approved'" type="button" disabled class="btn btn-success btn-sm ms-3">Approved</button>
              <button v-if="reservation.reserve_status == 'rejected'" type="button" disabled class="btn btn-danger btn-sm ms-3">Rejected</button>
              <button
                type="button"
                class="btn-close"
                @click="reservationModal.hide()"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div class="modal-body text-start">
              <div class="mt-2"><span>Room Type:</span><span class="fw-light ms-3">{{reservation.type_name}}</span></div>
              <div class="mt-2"><span>Reserve Date:</span><span class="fw-light ms-3">{{reservation.reserve_date}}</span></div>
              <div class="mt-2"><span>Reserve Time:</span></div>
              <div class="row mt-2">
                <div v-for="(hour, index) in reservation.reserve_hours" :key="index" class="col-3 p-1"><input
                disabled
                type="checkbox"
                class="btn-check"
                :id="'btn-check' + hour">
              <label
                class="selecttimebtn w-100 text-center rounded p-1"
                :for="'btn-check' + hour"
                style=""
                >{{ hour }}.00 - {{ hour + 1 }}.00</label
              ></div>
              </div>
              <div class="mt-2"><span>Total Price:</span><span class="fw-light ms-3">{{reservation.room_price}}</span></div>
              <div class="mt-2"><span>Customer Name:</span><span class="fw-light ms-3">{{user.name + ' ' + user.lastName}}</span></div>
              <div class="mt-2"><span>Phone:</span><span class="fw-light ms-3">{{user.phone}}</span></div>
              <div class="mt-2" v-if="reservation.reserve_status == 'pending'">
                <label for="exampleFormControlTextarea1" class="form-label">Remark:</label>
                <textarea class="form-control" id="exampleFormControlTextarea1" placeholder="write some remark" rows="3" v-model="reservation_remark"></textarea>
              </div>
              <div class="mt-2" v-if="reservation.reserve_status == 'rejected' || reservation.reserve_status == 'approved'">
              <div class="mt-2"><span>Remark:</span><span class="fw-light ms-3">{{reservation.reserve_remark}}</span></div>
              </div>
            </div>
            <div class="modal-footer">
              <button
                type="button"
                class="btn btn-outline-danger"
                @click="reservationModal.hide()"
                data-bs-dismiss="modal"
              >
                REJECT
              </button>
              <button
                type="button"
                class="btn btn-purple"
              >
                APPROVE
              </button>
            </div>
          </div>
        </div>
      </div>

    </div>
  </div>
</template>

<script>
import { Modal, Toast } from "bootstrap";
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
          commentBy: "Chaiyawat Roongrueng",
          commentById: 2,
          commentDetail:
            "ดีมากครับ แอร์เย็น สะอาด ไม่อับ ไมค์ไม่จี่ ไม่เหม็นน้ำลาย",
          commentDate: "20-04-2022",
        },
        {
          commentId: 3,
          commentBy: "Kulasatee Dul",
          commentById: 3,
          commentDetail: "พนักงานบริการดี เป็นกันเองค่ะ แต่แอร์ดังไปหน่อยค่ะ",
          commentDate: "28-04-2022",
        },
      ],
      reservation:{reserve_id: 3, inform_date: '20/04/2022', room_name: 'ห้องซ้อม P03', type_name: 'ห้องอัดเสียง', room_price: 600, reserve_date: '27/04/2022', reserve_hours: [18, 19, 20], reserve_status: 'rejected', reserve_remark: 'ร้านปิดให้บริการเนื่องจากวันสงกรานต์'},
      commentIdtoDelete: null,
      commentByToDelete: null,
      deleteCommentModal: null,
      deleteCommentToast: null,
      deleteRoomModal: null,
      deleteRoomToast: null,
      roomIdtoDelete: null,
      todayDate: null,
      imageNonMain: [],
      imageMain: [],

      reservationModal:null,
      reservation_remark: null
    };
  },
  methods: {
    showReservationModal() {
      this. reservationModal = new Modal(
        document.getElementById("reservationModal")
      );
      this.reservationModal.show();
    },
    showDeleteCommentModal(commentBy, commentId) {
      if(this.deleteCommentToast != null){
        this.deleteCommentToast.hide();
      }
      this.deleteCommentModal = new Modal(
        document.getElementById("deleteCommentModal")
      );
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
      this.showDeleteCommentToast();
    },
    showDeleteCommentToast() {
      this.deleteCommentToast = new Toast(
        document.getElementById("deleteCommentToast")
      );
      this.deleteCommentToast.show();
    },
    showDeleteRoomModal(room_id) {
      this.deleteRoomModal = new Modal(
        document.getElementById("deleteRoomModal")
      );
      this.deleteRoomModal.show();
      this.roomIdtoDelete = room_id;
    },
    deleteRoom() {
      // let index = this.commentList.findIndex(
      //   (val) => val.commentId === this.commentIdtoDelete
      // );
      // this.commentList.splice(index, 1);
      this.deleteRoomModal.hide();
      window.location.href="/create-room";
    }
  },
  created() {
    this.imageNonMain = this.room.room_image.filter((val) => val.main == 0);
    this.imageMain = this.room.room_image.filter((val) => val.main == 1);
  },
  computed: {
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
