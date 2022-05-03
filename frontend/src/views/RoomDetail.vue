<template>
  <div style="background-color: #131022" class="pb-5">
    <div>
      <div class="container-fluid p-0" style="height: 60vh">
        <img
          class="w-100"
          :src="`http://localhost:3001/${image_banner[0].file_path}`"
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
            {{ room.room_type }}</span
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
          <span
            v-if="user.role == 'staff'"
            type="button"
            class="btn btn btn-outline-danger ms-3 mb-3 pb-1 float-end"
            @click="showDeleteRoomModal()"
          >
            Delete
          </span>
          <router-link :to="{ path: `/edit-room/${room.room_id}` }"
            ><span
              v-if="user.role == 'staff'"
              type="button"
              class="btn btn-outline-warning mb-3 pb-1 float-end"
            >
              Edit
            </span></router-link
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
          v-if="user.role == 'customer'"
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
              @change="fetchReserveByDate()"
              style="
                background-color: #2a2838;
                color: #ffffff;
                border-color: #5c5b64;
              "
            />
          </div>
          <div class="row">
            <div
              class="col-6 mt-2"
              v-for="(time, index) in time_value"
              :key="index"
            >
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
                >{{ parseInt(time) }}.00 - {{ parseInt(time) + 1 }}.00</label
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
        <div
          v-for="(image, index) in image_nonbanner"
          :key="index"
          class="col-3"
        >
          <!-- <div class="text-danger">{{image.file_path}}</div> -->
          <img
            :src="`http://localhost:3001/${image.file_path}`"
            class="img-fluid rounded shadow-lg"
            alt="..."
            style="object-fit: cover; width: 100%; height: 15rem"
          />
        </div>
      </div>

      <!-- Write Review -->
      <div
        v-if="
          user.role == 'customer' &&
          review_list.findIndex(
            (review) => review.account_id == user.account_id
          ) == -1 &&
          reservation_list.findIndex(
            (reservation) =>
              reservation.room_id == room.room_id &&
              reservation.reserve_status == 'approved' &&
              reservation.account_id == user.account_id
          ) != -1
        "
        class="text-start"
      >
        <div class="row mt-5">
          <h1 style="color: #ffffff">Write a review</h1>
        </div>
        <div class="col-12 fs-4 p-4 text-white">
          {{ user.firstname + " " + user.lastname }}
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
          <button class="btn btn-purple float-end" @click="postReview()">
            Post review
          </button>
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
        v-for="(review, index) in review_list"
        :key="index"
        class="row text-start p-4"
        style="
          border-bottom-style: solid;
          border-width: 1px;
          border-color: #5c5b64;
        "
      >
        <div class="col-12 fs-4 text-white">
          {{ review.firstname + " " + review.lastname }}
          <span class="fw-light fs-6 ms-2" style="color: #5c5b64">{{
            review.review_datetime
          }}</span>
          <span
            @click="
              showDeletereviewModal(
                review.firstname + ' ' + review.lastname,
                review.review_id
              )
            "
            v-show="
              user.account_id == review.account_id || user.role == 'staff'
            "
            class="float-end bi bi-trash3 fs-6"
            style="color: #c4c4c4; cursor: pointer"
          ></span>
        </div>
        <div class="col-12 mt-2 fw-light" style="color: #c4c4c4">
          {{ review.review }}
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
              <h5 class="modal-title">Delete Room</h5>
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
              <span class="fw-bold">{{ room.room_name }}</span> ?
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
import axios from "axios";
export default {
  name: "RoomDetail",
  data() {
    return {
      user: {
        account_id: 1,
        phone: "0830494978",
        role: "staff",
      },
      room: null,
      reservation_list: [],
      new_reservation: [],
      time_value: ["11", "12", "13", "14", "15", "16", "17", "18", "19", "20"],
      reserve_hour: [],
      reserved_hour: [16, 17, 18, 19, 20],
      activebtn: "selecttimebtn",
      disablebtn: "reserve_hourbtn",
      reserve_date: null,
      instruments: [],
      room_image: [],
      reviewIdtoDelete: null,
      reviewByToDelete: null,
      deletereviewModal: null,
      deleteRoomModal: null,
      roomIdtoDelete: null,
      todayDate: null,
      reserveModal: null,
      image_nonbanner: [],
      image_banner: [],
      new_review: "",
      review_list: [],
      reservation_list_fetch: [],
    };
  },
  methods: {
    fetchReserveByDate() {
      axios
        .post("http://localhost:3001/reservations/date/", {
          reserve_date: this.reserve_date,
          room_id: this.room.room_id,
        })
        .then((response) => {
          console.log(response.data + "fetch");
          console.log("get date & reserve time");
          this.reservation_list_fetch = response.data.filter((reserve) => {
            if (reserve.account_id == this.user.account_id) {
              if (
                reserve.reserve_status == "pending" ||
                reserve.reserve_status == "approved"
              ) {
                return reserve;
              }
            }
          });
          this.reserved_hour = this.reservation_list_fetch
            .map((reserve) => {
              return reserve.reserve_hours;
            })
            .join()
            .split(",");
        })
        .catch((err) => {
          console.log(err.response.data);
        });
      this.reserve_hour = [];
    },
    postReview() {
      if (this.new_review == "") {
        this.$toast.warning("Please write something in your review!");
      } else if (
        this.review_list.findIndex(
          (review) => review.account_id == this.user.account_id
        ) != -1
      ) {
        this.$toast.error("You have reviewed this room already!");
      } else if (
        this.review_list.findIndex(
          (review) => review.account_id == this.user.account_id
        ) == -1
      ) {
        axios
          .post("http://localhost:3001/reviews", {
            account_id: this.user.account_id,
            review: this.new_review,
            room_id: this.room.room_id,
          })
          .then((response) => {
            console.log(response.data);
            this.review_list.push({
              account_id: this.user.account_id,
              firstname: this.user.firstname,
              lastname: this.user.lastname,
              phone: this.user.phone,
              review: this.new_review,
              room_id: this.room.room_id,
              review_id: response.data,
              review_datetime: "Just now",
            });
            this.new_review = "";
          })
          .catch((err) => {
            console.log(err.response.data);
          });
        this.$toast.success("Your review has been post!");
      }
    },
    showDeletereviewModal(review_by, review_id) {
      this.deletereviewModal = new Modal(
        document.getElementById("deleteModal")
      );
      this.deletereviewModal.show();
      console.log(review_id);
      this.reviewIdtoDelete = review_id;
      this.reviewByToDelete = review_by;
    },
    deletereview() {
      axios
        .delete(`http://localhost:3001/reviews/${this.reviewIdtoDelete}`)
        .then((response) => {
          console.log(response.data);
          let index = this.review_list.findIndex(
            (val) => val.review_id === this.reviewIdtoDelete
          );
          this.review_list.splice(index, 1);
          this.$toast.success(
            `${this.reviewByToDelete}'s review has been deleted!`
          );
        })
        .catch((err) => {
          console.log(err.response.data);
        });
      this.deletereviewModal.hide();
    },
    showReserveModal() {
      this.reserveModal = new Modal(document.getElementById("reserveModal"));
      this.reserveModal.show();
    },
    reserveRoom() {
      axios
        .post("http://localhost:3001/reservations", {
          account_id: this.user.account_id,
          room_id: this.room.room_id,
          reserve_date: this.reserve_date,
          reserve_hours: this.reserve_hour.toString(),
          reserve_status: "pending",
          total_price: this.totalPrice,
        })
        .then((response) => {
          console.log(response.data);
          this.reserved_hour.push(...this.reserve_hour);
          console.log("Room ... has been reserved.");
          this.reserveModal.hide();
          this.$toast.success("Your reservation has been sent!");
          this.reserve_hour = []
        })
        .catch((err) => {
          console.log(err.response.data);
        });
    },
    showDeleteRoomModal() {
      this.deleteRoomModal = new Modal(
        document.getElementById("deleteRoomModal")
      );
      this.deleteRoomModal.show();
      this.roomIdtoDelete = this.room.room_id;
    },
    deleteRoom() {
      if (
        this.reservation_list.findIndex(
          (reservation) =>
            reservation.room_id == this.room.room_id &&
            reservation.reserve_status == "pending"
        ) == -1
      ) {
        axios
          .delete(`http://localhost:3001/rooms/${this.room.room_id}`)
          .then((response) => {
            console.log(response.data);
            this.deleteRoomModal.hide();
            this.$router.push("/room-list");
            this.$toast.success(`${this.room.room_name} has been deleted`);
          })
          .catch((err) => {
            console.log(err.response.data);
          });
      } else {
        this.$toast.error(
          `There are pending reservations in ${this.room.room_name} !`
        );
      }
    },
  },
  created() {
    this.todayDate = new Date();
    if (JSON.parse(localStorage.getItem("user")) == null) {
      this.user = {
        role: "anonymous",
      };
    } else {
      this.user = JSON.parse(localStorage.getItem("user"));
    }
    var yyyy = this.todayDate.getFullYear();
    let mm = this.todayDate.getMonth() + 1; // Months start at 0!
    let dd = this.todayDate.getDate();

    if (dd < 10) dd = "0" + dd;
    if (mm < 10) mm = "0" + mm;

    this.todayDate = yyyy + "-" + mm + "-" + dd;

    this.reserve_date = this.todayDate;

    axios
      .get(`http://localhost:3001/rooms/${this.$route.params.id}`)
      .then((response) => {
        console.log(response.data);
        this.room = response.data[0];
        this.fetchReserveByDate();
      })
      .catch((err) => {
        console.log(err.response.data);
      });

    axios
      .get(`http://localhost:3001/reviews/${this.$route.params.id}`)
      .then((response) => {
        console.log(response.data);
        this.review_list = response.data;
      })
      .catch((err) => {
        console.log(err.response.data);
      });

    axios
      .get(`http://localhost:3001/rooms/${this.$route.params.id}/instruments`)
      .then((response) => {
        console.log(response.data);
        this.instruments = response.data;
      })
      .catch((err) => {
        console.log(err.response.data);
      });

    axios
      .get(`http://localhost:3001/rooms/${this.$route.params.id}/images`)
      .then((response) => {
        console.log(response.data);
        this.room_image = response.data;
        this.image_nonbanner = this.room_image.filter((val) => val.banner == 0);
        this.image_banner = this.room_image.filter((val) => val.banner == 1);
      })
      .catch((err) => {
        console.log(err.response.data);
      });

    axios
      .get(`http://localhost:3001/reservations/${this.user.account_id}`)
      .then((response) => {
        console.log(response.data);
        this.reservation_list = response.data;
      })
      .catch((err) => {
        console.log(err.response.data);
      });
  },
  mounted() {},
  computed: {
    totalPrice() {
      return this.reserve_hour.length * this.room.room_price;
    },
    countreview() {
      return this.review_list.length;
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
input[type="checkbox"]:disabled + label {
  color: #807b8a;
  background-color: #2a2838;
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
