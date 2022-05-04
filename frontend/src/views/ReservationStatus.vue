<template>
  <div style="background-color: #131022; height: 100vh">
    <div class="container pt-5" style="background-color: #131022">
      <h1 class="text-start mb-4 linear-color fw-bold">Reservation Status</h1>

      <!-- Status nav -->
      <div class="row">
        <div class="btn-group">
          <input
            class="btn-check"
            type="radio"
            name="status-check"
            id="all"
            value="all"
            v-model="selected_status"
          />
          <label
            class="btn btn-custom status-bar"
            :class="
              selected_status == 'all' ? 'select-status-bar' : 'status-bar'
            "
            for="all"
            >All Reservation</label
          >

          <input
            class="btn-check"
            type="radio"
            name="status-check"
            id="pending"
            value="pending"
            v-model="selected_status"
          />
          <label
            class="btn btn-custom status-bar"
            :class="
              selected_status == 'pending' ? 'select-status-bar' : 'status-bar'
            "
            for="pending"
            >Pending</label
          >

          <input
            class="btn-check"
            type="radio"
            name="status-check"
            id="approved"
            value="approved"
            v-model="selected_status"
          />
          <label
            class="btn btn-custom status-bar"
            :class="
              selected_status == 'approved' ? 'select-status-bar' : 'status-bar'
            "
            for="approved"
            >Approved</label
          >

          <input
            class="btn-check"
            type="radio"
            name="status-check"
            id="rejected"
            value="rejected"
            v-model="selected_status"
          />
          <label
            class="btn btn-custom status-bar"
            :class="
              selected_status == 'rejected' ? 'select-status-bar' : 'status-bar'
            "
            for="rejected"
            >Rejected</label
          >

          <label
            class="btn status-bar"
            style="width: 49rem; cursor: default"
          ></label>
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
        <ul
          class="list-group list-group-horizontal res-list-group py-3 text-start fw-light align-items-center"
          :id="reservation.reserve_id"
          v-for="reservation in filteredReservation"
          :key="reservation.reservation_id"
          @click="showReservationModal(reservation)"
        >
          <li class="list-group-item ps-5" style="width: 11rem">
            {{ reservation.inform_datetime.substring(0, 10) }}
          </li>
          <li class="list-group-item">{{ reservation.room_name }}</li>
          <li class="list-group-item">{{ reservation.room_type }}</li>
          <li class="list-group-item" style="width: 7rem">
            {{ reservation.total_price }} บาท
          </li>
          <li class="list-group-item" style="width: 8rem">
            {{ reservation.reserve_date.substring(0, 10) }}
          </li>
          <li class="list-group-item" style="width: 29rem">
            {{ reservation.hours }}
          </li>
          <li
            class="list-group-item"
            v-if="reservation.reserve_status === 'pending'"
          >
            <span class="fw-normal text-warning">Pending</span>
          </li>
          <li
            class="list-group-item"
            v-else-if="reservation.reserve_status === 'approved'"
          >
            <span class="fw-normal" style="color: #22c55e">Approved</span>
          </li>
          <li
            class="list-group-item"
            v-else-if="reservation.reserve_status === 'rejected'"
          >
            <span class="fw-normal text-danger">Rejected</span>
          </li>
        </ul>
      </div>

      <!-- reservation modal -->
      <div
        class="modal fade"
        id="reservationModal"
        tabindex="-1"
        aria-hidden="true"
      >
        <div class="modal-dialog modal-dialog-centered">
          <div class="modal-content px-2 pb-3">
            <div class="modal-header align-contents-between d-flex">
              <div class="d-flex flex-column align-items-start">
                <span class="modal-title fs-3">{{
                  selected_reservation.room_name
                }}</span
                ><span class="fw-light"
                  >Created Date: {{ inform_datetime_modal }}</span
                >
              </div>
              <div class="d-flex flex-row me-2">
                <button
                  v-if="selected_reservation.reserve_status == 'pending'"
                  type="button"
                  disabled
                  class="btn btn-warning btn-sm ms-3"
                >
                  Pending
                </button>
                <button
                  v-else-if="selected_reservation.reserve_status == 'approved'"
                  type="button"
                  disabled
                  class="btn btn-success btn-sm ms-3"
                >
                  Approved
                </button>
                <button
                  v-else-if="selected_reservation.reserve_status == 'rejected'"
                  type="button"
                  disabled
                  class="btn btn-danger btn-sm ms-3"
                >
                  Rejected
                </button>
                <button
                  type="button"
                  class="btn-close ms-3"
                  @click="reservation_modal.hide()"
                  data-bs-dismiss="modal"
                  aria-label="Close"
                ></button>
              </div>
            </div>
            <div class="modal-body text-start">
              <div class="mt-2">
                <span>Room Type:</span
                ><span class="fw-light ms-3">{{
                  selected_reservation.room_type
                }}</span>
              </div>
              <div class="mt-2">
                <span>Reserve Date:</span
                ><span class="fw-light ms-3">{{ reserve_datetime_modal }}</span>
              </div>
              <div class="mt-2"><span>Reserve Time:</span></div>
              <div class="row mt-2 ps-2">
                <div
                  v-for="(hour, index) in reserve_hours_modal"
                  :key="index"
                  class="col-3 p-1"
                >
                  <input
                    disabled
                    type="checkbox"
                    class="btn-check"
                    :id="'btn-check' + hour"
                  />
                  <label
                    class="selecttimebtn w-100 text-center rounded p-1"
                    :for="'btn-check' + hour"
                    style=""
                    >{{ parseInt(hour) }}.00 -
                    {{ parseInt(hour) + 1 }}.00</label
                  >
                </div>
              </div>
              <div class="mt-2">
                <span>Total Price:</span
                ><span class="fw-light ms-3"
                  >{{ selected_reservation.total_price }} บาท</span
                >
              </div>
              <div class="mt-2">
                <span>Customer Name:</span
                ><span class="fw-light ms-3">{{
                  selected_reservation.firstname +
                  " " +
                  selected_reservation.lastname
                }}</span>
              </div>
              <div class="mt-2">
                <span>Phone:</span
                ><span class="fw-light ms-3">{{
                  selected_reservation.phone
                }}</span>
              </div>
              <div
                class="mt-2"
                v-if="
                  selected_reservation.reserve_status == 'rejected' ||
                  selected_reservation.reserve_status == 'approved'
                "
              >
                <label for="exampleFormControlTextarea2" class="form-label"
                  >Remark:</label
                >
                <textarea
                  class="form-control"
                  id="exampleFormControlTextarea2"
                  rows="3"
                  disabled
                  v-model="selected_reservation.reserve_remark"
                  style="resize: none"
                ></textarea>
              </div>
              <div
                v-if="selected_reservation.reserve_status == 'approved'"
                class="mt-2"
                style="color: #6366f1"
              >
                <span><i class="bi bi-info-circle"></i></span
                ><span class="fw-light ms-2"
                  >หลังใช้บริการห้องแล้ว สามารถรีวิวห้องได้<span
                    @click="goToReview()"
                    style="color: #6366f1"
                    ><span
                      class="ms-1 text-decoration-underline fw-normal"
                      style="cursor: pointer"
                      >ที่นี่</span
                    ></span
                  ></span
                >
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- blur bg -->
      <div class="circle1"></div>
      <div class="circle2"></div>
    </div>
  </div>
</template>

<script>
import { Modal } from "bootstrap";
import axios from "axios";
export default {
  name: "ReservationList",
  data() {
    return {
      user: {
        account_id: 3,
        firstname: "Kulasatee",
        lastname: "Dul",
        phone: "0826527820",
        role: "customer",
      },
      //array for reservation join with customer
      reservation_list: [],
      //>>array for reservation join with customer

      //for filter status
      selected_status: "",
      //>>for filter status

      //for modal
      reservation_modal: null,
      selected_reservation: {},
      reservation_remark: "",
      inform_datetime_modal: "",
      reserve_datetime_modal: "",
      reserve_hours_modal: null,
      //>>for modal
      hours_for_show: null,
    };
  },
  created() {
    if (JSON.parse(localStorage.getItem("user")) == null) {
      this.user = {
        role: "anonymous",
      };
    } else {
      this.user = JSON.parse(localStorage.getItem("user"));
    }
    axios
      .get(`http://localhost:3001/reservations/${this.user.account_id}`)
      .then((response) => {
        // console.log(response.data);
        this.reservation_list = response.data;
        var hours_concat = ''
        this.reservation_list.forEach((reserve, index) => {
          this.hours_for_show = reserve.reserve_hours.split(",");
          this.hours_for_show.forEach((hour) => {
            hours_concat += parseInt(hour) + '.00-' + (parseInt(hour)+1) + '.00, '
            console.log(hours_concat)
          })
          console.log(this.hours_for_show)
          hours_concat = hours_concat.substring(0, hours_concat.length-2)
          this.reservation_list[index]['hours'] = hours_concat
          hours_concat = ''
        });
      })
      .catch((err) => {
        console.log(err.response.data);
      });
  },
  methods: {
    showReservationModal(reservation) {
      this.reservation_modal = new Modal(
        document.getElementById("reservationModal")
      );
      this.selected_reservation = reservation;
      this.inform_datetime_modal = this.selected_reservation.inform_datetime.substring(0, 10);
      this.reserve_datetime_modal = this.selected_reservation.reserve_date.substring(0, 10);
      this.reserve_hours_modal = this.selected_reservation.reserve_hours.split(',')
      this.reservation_modal.show();
    },
    goToReview() {
      this.reservation_modal.hide();
      this.$router.push({
        path: `/room-detail/${this.selected_reservation.room_id}`,
      });
    },
  },
  computed: {
    filteredReservation() {
      let filter_reservation = [];
      if (this.selected_status == "pending") {
        filter_reservation = this.reservation_list.filter(
          (val) => val.reserve_status == "pending"
        );
        return filter_reservation;
      } else if (this.selected_status == "approved") {
        filter_reservation = this.reservation_list.filter(
          (val) => val.reserve_status == "approved"
        );
        return filter_reservation;
      } else if (this.selected_status == "rejected") {
        filter_reservation = this.reservation_list.filter(
          (val) => val.reserve_status == "rejected"
        );
        return filter_reservation;
      } else {
        return this.reservation_list;
      }
    },
  },
};
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
.select-status-bar {
  color: #6366f1;
  border-bottom: 1px solid #6366f1;
  width: 9rem;
  cursor: pointer;
}
.btn-custom:hover {
  color: #6366f1;
  border-bottom: 1px solid #6366f1;
}
.btn:focus {
  outline: none;
  box-shadow: none;
}
.btn-pri {
  background-color: #6366f1;
  color: white;
}
.btn-sec {
  color: #6366f1;
  border-color: #6366f1;
}
.btn-dis {
  color: #807b8a;
  background-color: #2a2838;
}
::-webkit-calendar-picker-indicator {
  filter: invert(1);
}
.selecttimebtn {
  background-color: #6865f2;
  color: #ffffff;
}
.btn-purple {
  background-color: #6366f1;
  color: #ffffff;
}
.res-list-group {
  border-bottom: 0.5px solid #5c5b64;
  cursor: pointer;
  height: 6rem;
}
.res-list-group:hover {
  border-left: 1px solid #6366f1;
  background-color: rgba(31, 28, 45, 0.5);
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
  background-color: #2a2838;
  color: #afacb6;
  width: 440px;
  padding: 5px 5px 5px 5px;
}
</style>
