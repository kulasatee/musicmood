<template>
  <div style="background-color: #131022; height: 100vh">
    <div class="container pt-5" style="background-color: #131022">
      <h1 class="text-start mb-4 linear-color fw-bold">Reservation List</h1>

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
          v-for="reservation in filteredReservation"
          :key="reservation.reserve_id"
          @click="showReservationModal(reservation)"
        >
          <li class="list-group-item ps-5" style="width: 11rem">
            {{ reservation.inform_datetime }}
          </li>
          <li class="list-group-item">{{ reservation.room_name }}</li>
          <li class="list-group-item">{{ reservation.room_type }}</li>
          <li class="list-group-item" style="width: 7rem">
            {{ reservation.total_price }} บาท
          </li>
          <li class="list-group-item" style="width: 8rem">
            {{ reservation.reserve_date}}
          </li>
          <li class="list-group-item" style="width: 29rem">
            {{ reservation.hours }}
          </li>
          <li
            class="list-group-item"
            v-if="reservation.reserve_status === 'pending'"
          >
            <button
              type="button"
              class="btn btn-outline-warning"
              style="cursor: pointer"
            >
              Pending
            </button>
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
                  >Created Date:
                  {{ selected_reservation.inform_datetime }}</span
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
                ><span class="fw-light ms-3">{{
                  selected_reservation.reserve_date
                }}</span>
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
                    >{{ parseInt(hour) }}.00 - {{ parseInt(hour) + 1 }}.00</label
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
                v-if="selected_reservation.reserve_status == 'pending'"
              >
                <label for="exampleFormControlTextarea1" class="form-label"
                  >Remark:</label
                >
                <textarea
                  class="form-control"
                  id="exampleFormControlTextarea1"
                  placeholder="write some remark"
                  rows="3"
                  v-model="reservation_remark"
                  style="resize: none"
                ></textarea>
              </div>
              <div
                class="mt-2"
                v-else-if="
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
            </div>
            <div
              class="modal-footer"
              v-if="selected_reservation.reserve_status == 'pending'"
            >
              <button
                type="button"
                class="btn btn-outline-danger"
                @click="rejectReservation()"
                data-bs-dismiss="modal"
              >
                REJECT
              </button>
              <button
                type="button"
                class="btn btn-green"
                @click="approveReservation()"
              >
                APPROVE
              </button>
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
import axios from "../plugins/axios";
export default {
  name: "ReservationList",
  data() {
    return {
      //array for reservation join with customer
      reservation_list: [],
      //>>array for reservation join with customer
      reservation_specific_date: [],
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
      .get("/reservations")
      .then((response) => {
        console.log(response.data);
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
    //format hours
    let hours_concat = "";
    for (let index = 0; index < this.reservation_list.length; index++) {
      for (
        let i = 0;
        i < this.reservation_list[index].reserve_hours.length;
        i++
      ) {
        hours_concat +=
          this.reservation_list[index].reserve_hours[i] +
          ".00-" +
          (parseInt(this.reservation_list[index].reserve_hours[i]) + 1) +
          ".00, ";
      }
      var result = hours_concat.substring(0, hours_concat.length - 2);
      this.reservation_list[index]["hours"] = result;
      hours_concat = "";
    }
  },
  methods: {
    showReservationModal(reservation) {
      this.reservation_modal = new Modal(
        document.getElementById("reservationModal")
      );

      this.selected_reservation = reservation;

      this.inform_datetime_modal =
        this.selected_reservation.inform_datetime.substring(0, 10);
      this.reserve_datetime_modal =
        this.selected_reservation.reserve_date.substring(0, 10);
      this.reserve_hours_modal = this.selected_reservation.reserve_hours.split(',')
      this.reservation_modal.show();

      axios
        .post("/reservations/date/", {
          reserve_date: this.reserve_datetime_modal,
          room_id: this.selected_reservation.room_id,
        })
        .then((response) => {
          this.reservation_specific_date = response.data;
          this.reservation_specific_date =
            this.reservation_specific_date.filter(
              (val) => val.reserve_status == "approved"
            );
        })
        .catch((err) => {
          console.log(err.response.data);
        });
    },
    approveReservation() {
      var res_hour = this.reservation_specific_date.map((val) => {
        return val.reserve_hours;
      });
      console.log(res_hour)
      res_hour = res_hour.join(",").split(",");

      console.log(res_hour);
      console.log(this.selected_reservation.reserve_hours.split(','))
      // console.log(res_hour.includes(this.selected_reservation.reserve_hours.split(',')))

        var isOverlap = "";
        this.selected_reservation.reserve_hours
          .split(",")
          .forEach((element) => {
            if (res_hour.includes(element)) {
              isOverlap = "YES";
            }
          });
      if (isOverlap == "YES") {
        this.$toast.error(`Time overlap !`);
      } else {
        axios
        .put("/reservations", {
          reserve_status: "approved",
          reserve_remark: this.reservation_remark,
          reserve_id: this.selected_reservation.reserve_id,
        })
        .then((response) => {
          console.log(response.data);
          let index = this.reservation_list.findIndex(
            (val) =>
              val.reserve_id === this.selected_reservation.reserve_id
          );
          this.reservation_list[index]["reserve_status"] = "approved";
          this.reservation_list[index]["reserve_remark"] = this.reservation_remark;
          this.reservation_modal.hide();
          this.$toast.success(`Reservation has been approved successfully!`);
        })
        .catch((err) => {
          console.log(err.response.data);
        });
      }
      
    },

    rejectReservation() {
      

      axios
        .put("/reservations", {
          reserve_status: "rejected",
          reserve_remark: this.reservation_remark,
          reserve_id: this.selected_reservation.reserve_id,
        })
        .then((response) => {
          console.log(response.data);
          let index = this.reservation_list.findIndex(
            (val) => val.reserve_id === this.selected_reservation.reserve_id
          );
          this.reservation_list[index]["reserve_status"] = "rejected";
          this.reservation_modal.hide();
          this.$toast.success(`Reservation has been rejected successfully!`);
        })
        .catch((err) => {
          console.log(err.response.data);
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
.btn-green {
  background-color: #22c55e;
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
