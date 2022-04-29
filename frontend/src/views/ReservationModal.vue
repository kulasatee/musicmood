<template>
  <div style="background-color: #131022" class="pb-5">
    
    <div class="container">
      <!-- first row -->
      <div class="row">
        <div class="col py-5 ps-0 text-start">
           <span
            type="button"
            class="btn btn btn-outline-primary me-3 ms-3 mb-3 pb-1 float-end"
            @click="showReservationModal()"
          >
            Show
          </span>
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
import { Modal } from "bootstrap";
export default {
  name: "ReservationModal",
  data() {
    return {
    
      
      user: {
        userId: 2,
        name: "Chaiyawat",
        lastName: "Roongrueng",
        phone: "080-123-4567",
      },
      reservation:{reserve_id: 3, inform_date: '20/04/2022', room_name: 'ห้องซ้อม P03', type_name: 'ห้องอัดเสียง', room_price: 600, reserve_date: '27/04/2022', reserve_hours: [18, 19, 20], reserve_status: 'pending', reserve_remark: 'ร้านปิดให้บริการเนื่องจากวันสงกรานต์'},
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
  },
  created() {
  },
  computed: {
  },
};
</script>

<style scoped>
::-webkit-calendar-picker-indicator {
  filter: invert(1);
}
.selecttimebtn{
  background-color: #6865F2;
  color: #ffffff;
}
.btn-purple {
  background-color: #6366f1;
  color: #ffffff;
}

</style>
