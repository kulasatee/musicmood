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
      <div class="row mt-3">
        <div v-for="image in imageNonMain" :key="image" class="col-3">
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
        Name: "Chaiyawat",
        LastName: "Roongrueng",
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
      commentIdtoDelete: null,
      commentByToDelete: null,
      deleteCommentModal: null,
      deleteCommentToast: null,
      deleteRoomModal: null,
      deleteRoomToast: null,
      roomIdtoDelete: null,
      todayDate: null,
      imageNonMain: [],
      imageMain: []
    };
  },
  methods: {
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
