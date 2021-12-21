<template>
  <div class="m-content">
    <div class="m-title">
      <span>Nhân viên</span>
      <button id="btn-add" @click="btnAddOnClick" class="m-btn m-btn-add">
        Thêm mới nhân viên
      </button>
    </div>

    <div class="m-content-main">
      <div class="m-row">
        <div class="m-filter">
          <input
            placeholder="Tìm kiếm theo mã hoặc số điện thoại"
            class="m-input m-input-search"
          />

          <div class="m-refresh">
            <button
              class="m-btn m-btn-icon m-btn-refresh"
              id="btnRefresh"
              @click="refresh()"
            >
              <i class="fas fa-redo"></i>
            </button>
          </div>
        </div>
      </div>
      <div>
        <div class="m-table">
          <table style="" id="tblEmployee">
            <thead class="m-text-left">
              <tr>
                <th fieldName="EmployeeCode"></th>
                <th fieldName="EmployeeCode">Mã nhân viên</th>
                <th fieldName="FullName">Họ và tên</th>
                <th fieldName="GenderName">Giới tính</th>
                <th
                  fieldName="DateOfBirth"
                  formatType="ddMMyyyy"
                  class="m-text-center"
                >
                  Ngày sinh
                </th>
                <th fieldName="PhoneNumber">Điện thoại</th>
                <th fieldName="Email">Email</th>
                <th fieldName="PositionName">Địa chỉ</th>

                <th fieldName="Salary" formatType="money" class="m-text-right">
                  Phòng ban
                </th>
                <th>Tài khoản ngân hàng</th>

                <th>Chức năng</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="employee in employees" :key="employee.employeeId">
                <td>
                  <input type="checkbox" name="" id="" />
                </td>
                <td>{{ employee.EmployeeCode }}</td>
                <td>{{ employee.EmployeeName }}</td>
                <td>{{ employee.Gender | formatGender(employee.Gender) }}</td>
                <td>
                  {{
                    employee.DateOfBirth
                      | formatDateOfBirth(employee.DateOfBirth)
                  }}
                </td>
                <td>{{ employee.PhoneNumber }}</td>
                <td>{{ employee.Email }}</td>
                <td>{{ employee.Address }}</td>
                <!-- <td>
                {{ employee.Salary | formatCurrency(employee.Salary) }}
              </td> -->
                <td>{{ employee.DepartmentName }}</td>
                <!-- <td>{{ employee.BankAccountNumber }}</td> -->

                <td>
                  <span @click="btnEditOnClick(employee.EmployeeId)">Sửa</span>

                  <button
                    class="dropdown-btn"
                    @click="showListRowTable(employee.EmployeeId)"
                  >
                    <!-- @click="showContextMenu($event, employee.EmployeeId)" -->
                    <div class="m-icon icon-16 m-icon-arrow-up--blue"></div>
                  </button>

                  <div class="data-list-row" :id="employee.EmployeeId">
                    <div class="data-items">
                      <div class="data-item">Nhân bản</div>
                      <div
                        @click="showFormDelete(employee.EmployeeId)"
                        class="data-item"
                        id="btn-delete-row"
                      >
                        Xóa
                      </div>
                      <div class="data-item">Ngừng</div>
                    </div>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
    <div class="m-navigation">
      <div class="m-paging-left">
        <div class="m-paging-text-left">
          Tổng số: <b>{{ TotalRecord }}</b> bản ghi
        </div>
      </div>
      <div class="m-paging-center">
        <ComboboxPanigation
          :ListItem="[
            '10 bản ghi trên trang',
            '20 bản ghi trên trang',
            '30 bản ghi trên trang',
            '50 bản ghi trên trang',
            '100 bản ghi trên trang',
          ]"
          v-if="true"
          @handleSelect="changeRecordNumber"
        />
        <PaginationPage
          :totalPages="totalPages"
          @changePage="changePageNumber"
        />
        <!-- <button class="m-btn-paging m-btn-paging-First">Trước</button>
        <div class="m-paging-number">
          <div class="m-page-item">1</div>
          <div class="m-page-item">2</div>
          <div class="m-page-item">3</div>
          <div class="m-page-item">...</div>
          <div class="m-page-item">6</div>
        </div>
        <button class="m-btn-paging m-btn-paging-Next">Sau</button> -->
      </div>
    </div>
    <!-- Phần loading -->
    <div class="loading">
      <div class="loading-icon"></div>
      <div class="dialog-background"></div>
    </div>
    <!-- POPUP: DELETE EMPLOYEE!!! -->
    <div id="dlgDeletePopup" class="m-delete-modal" v-show="confirmDelete">
      <div class="m-message-box">
        <div class="m-message-content">
          <div class="m-message-icon">
            <div class="m-icon m-icon-exclaimation-warning icon-48"></div>
          </div>

          <span
            >Bạn có muốn xóa Nhân viên <b class="employeeCode_text"></b> hay
            không ?</span
          >
        </div>
        <div class="m-mess-line"></div>
        <div class="m-message-footer">
          <button class="m-second-btn" v-on:click="cancelDetele">Không</button>
          <div class="m-flex-space"></div>
          <button class="m-btn" @click="btnDeleteOnClick">Có</button>
        </div>
      </div>
    </div>
    <!--PopUp Error : hiển lên khi xảy ra ngoại lệ-->
    <div id="dlgDeletePopup" class="m-delete-modal" v-show="isError">
      <div class="m-message-box">
        <div class="m-message-content">
          <div class="m-message-icon">
            <div class="m-icon m-icon-exclaimation-warning icon-48"></div>
          </div>
          <span class="m-message-text">
            {{ textError }}
          </span>
        </div>
        <div class="m-mess-line"></div>
        <div class="m-message-footer">
          <div class="m-flex-space"></div>
          <button class="m-btn" @click="closePopUp">Đồng ý</button>
        </div>
      </div>
    </div>
    <!-- CONTEXT MENU -->
    <!-- <div id="contextMenu" v-show="toogleMenu">
      <button id="duplicate">Nhân bản</button>
      <button id="delete" @click="btnDeleteOnClick(employee.EmployeeId)">
        Xóa
      </button>
      <button id="stopUsing">Ngừng sử dụng</button>
    </div> -->
    <EmployeeDetail
      :isShow="isShowDialogDetail"
      @closeForm="closeForm"
      @loadData="loadData"
      :employee="employee"
      @save="btnSaveOnClick"
    />
    <!--Toast Message-->
    <ToastMessage :isShowToast="isShowToast" :toastText="toastText" />
  </div>
  <!-- :EmployeeId="employeeId"
      
      @save="btnSaveOnClick" -->
</template>

<script>
import ToastMessage from "../Item/ToastMessage.vue";
import PaginationPage from "../Item/PaginationPage.vue";
import ComboboxPanigation from "../combobox/ComboboxPanigation.vue";
import EmployeeDetail from "./EmployeeDetail.vue";
import axios from "axios";
import $ from "jquery"; //tải jquery
export default {
  components: {
    EmployeeDetail,
    ToastMessage,
    PaginationPage,
    ComboboxPanigation,
  },
  data() {
    return {
      employees: [],

      employee: {
        EmployeeCode: "",
        BankName: "TECHCOMBANK",
        BankBranchName: "HƯNG YÊN",
        BankAccountNumber: "145889785",
        EmployeeName: "Lê ",
        DepartmentId: "",
      },
      isShowToast: false,
      toastText: "",
      isError: false,
      textError: "",
      // employeeCodeDelete: "",
      confirmDelete: false,
      toogleMenu: false, //hiện form ẩn hiện xóa
      isShowDialogDetail: false,
      EmployeeId: "",
      Department: {},
      totalPages: 0, //tổng số trang
      pageSize: 10,
      pageNumber: 1,
      searchText: "",
      TotalRecord: 0,
    };
  },
  created() {
    this.loadData();
  },
  methods: {
    /**
     * Hiển thị menu chức năng: xoá, nhân bản, ngưng sử dụng
     * CreatedBy: lê thanh ngọc (19/12/2021)
     */
    // showContextMenu(e, employeeId) {
    //   this.toogleMenu = true;
    //   var positionMenu = e.target;
    //   let contextMenu = $("#contextMenu");
    //   this.employeeCodeDelete = $(positionMenu)
    //     .parent()
    //     .parent()
    //     .parent()
    //     //
    //     .siblings("#EmployeeCode")
    //     .text(); //
    //   contextMenu.toggle(); //ấn phán nữa ẩn form
    //   let top_pos = $(positionMenu).offset().top;
    //   let left_pos = $(positionMenu).offset().left;
    //   if (top_pos + 24 <= window.innerHeight - 90) {
    //     contextMenu.css("top", `calc(${top_pos}px + 24px)`);
    //   } else {
    //     contextMenu.css("top", `calc(${top_pos}px - 88px)`);
    //   }
    //   contextMenu.css("left", `calc(${left_pos}px - 86px)`);

    //   this.employeeId = employeeId; //lấy id nv đẻ xóa
    // },

    //đóng form cảnh báo
    closePopUp() {
      this.isError = false;
      this.textError = "";
    },
    showToastMessage() {
      setTimeout(() => {
        this.isShowToast = true;
      }, 0);
      setTimeout(() => {
        this.isShowToast = false;
      }, 3000);
    },
    showListRowTable(EmployeeId) {
      $(`#${EmployeeId}`).show();

      setTimeout(() => {
        $(`#${EmployeeId}`).hide();
      }, 3000);
    },
    /**
     * sự kiện click (add)
     * createBy:Ngọc lê (9/21/2021)
     */

    btnAddOnClick() {
      axios
        .get(`http://amis.manhnv.net/api/v1/Employees/NewEmployeeCode`)
        .then((response) => {
          console.log(response);
          this.employee.EmployeeCode = response.data;
          this.showDialogParent(true);
          //$("txtemployeecode").focus();
        })
        .catch((e) => {
          this.errors.push(e);
        });
    },

    /**
     * sự kiện click form chi tiết (UPDATE)
     * CreateBy: LT Ngọc
     * createDate:9/12/2021
     */
    btnEditOnClick(EmployeeId) {
      this.EmployeeId = EmployeeId;
      this.showDialogParent(true);
      axios
        .get(`http://amis.manhnv.net/api/v1/Employees/` + EmployeeId)
        .then((response) => {
          this.employee = response.data;
          console.log(response);

          if (response.data.DateOfBirth != "") {
            this.customer.DateOfBirth = this.formatDate(
              response.data.DateOfBirth
            );
          }
        })
        .catch((e) => {
          console.log(e);
        });
    },
    //sự kiện show hoặc ẩn form từ phía cha
    showDialogParent(isShow) {
      this.isShowDialogDetail = isShow;
    },
    //close form
    closeForm() {
      this.employee = {};
      this.showDialogParent(false);
      this.loadData();
    },
    /**
     * sự kiện lưu dữ liệu (chả)
     */
    btnSaveOnClick(emp) {
      var me = this;
      //lấy dữ liệu

      if (me.EmployeeId != "") {
        // //gọi api thực hiện cất dữ liệu
        axios
          .put(
            "http://amis.manhnv.net/api/v1/Employees/" + this.EmployeeId,
            emp
          )
          .then(() => {
            this.showToastMessage();
            this.toastText = "Đã sửa thành công";
            //this.showDialogParent(false);
            // sửa thành công sẽ gọi sự kiện close form
            this.closeForm();
            this.EmployeeId = "";
            //dữ liệu trên form null

            //sự kiện load dữ liệu
            me.loadData();
          })
          .catch(function (res) {
            console.log(res);
          });
      } else {
        axios
          .post("http://amis.manhnv.net/api/v1/Employees", emp)
          .then(() => {
            me.showToastMessage();
            me.toastText = "Đã thêm thành công";
            //thêm thành công thì tự động đóng form
            me.showDialogParent(false);
            //sự kiện load dữ liệu
            me.loadData();
          })
          .catch(function (res) {
            const statusCode = res.response.status;
            switch (statusCode) {
              case 400:
                me.textError = res.response.data.userMsg;
                me.isError = true;
                break;
              default:
                break;
            }
          });
      }
    },

    /**
     *  CreateBy Lê thanh ngọc (19/12/2021)
     * sự kiện show form Delete
     */
    showFormDelete(employeeId) {
      axios
        .get(`http://amis.manhnv.net/api/v1/Employees/` + employeeId)
        .then((res) => {
          $(".employeeCode_text").text(` ${res.data.EmployeeCode} `);
          //$(`#${employeeId}`).hide();
        })
        .catch((e) => {
          console.log(e);
        });
      //lấy id của nhân viên
      this.employeeId = employeeId;
      this.confirmDelete = true;
    },
    /**
     * CreateBy Lê thanh ngọc (19/12/2021)
     * sự kiện xóa form
     */
    btnDeleteOnClick() {
      var me = this;
      axios
        .delete("http://amis.manhnv.net/api/v1/Employees/" + me.employeeId)
        .then(() => {
          me.showToastMessage();
          me.toastText = "Đã xoá thành công";
          //đóng form
          me.confirmDelete = false;
          //
          me.toogleMenu = false;
          //sự kiện load dữ liệu
          me.loadData();
        })
        .catch(function (res) {
          const statusCode = res.response.status;
          switch (statusCode) {
            case 400:
              alert(res.response.data.userMsg);
              break;
            default:
              break;
          }
        });
    },

    //
    cancelDetele() {
      this.confirmDelete = false;
    },

    //sự kiện load dữ liệu
    loadData() {
      axios
        .get(
          `http://amis.manhnv.net/api/v1/Employees/filter?pageSize=${this.pageSize}&pageNumber=${this.pageNumber}&employeeFilter=${this.searchText}`
        )
        .then((res) => {
          this.employees = res.data.Data;
          //
          this.totalPages = res.data.TotalPage;
          this.TotalRecord = res.data.TotalRecord; //tổng số bản ghi

          this.showDialogParent(false);
          console.log(res);
        })
        .catch((error) => console.log(error));
    },
    /**
     * Số lượng bản ghi trên một trang
     * CreatedBy: Quang Duy (14/12/2021)
     */
    changeRecordNumber(pageRecord) {
      this.pageSize = pageRecord;
      this.loadData();
    },
    /**
     * Chuyển trang
     * CreatedBy: Quang Duy (17/12/2021)
     */
    changePageNumber(pageNumber) {
      this.pageNumber = pageNumber;
      this.loadData();
    },
    /**
     * làm mới lại trang
     */
    refresh() {
      this.loadData();
      $(".loading").css("display", "block");
      setTimeout(() => {
        $(".loading").css("display", "none");
      }, 1000);
    },
  },
  filters: {
    formatDateOfBirth: function (data) {
      if (data) {
        const newDate = new Date(data);
        var day = newDate.getDate();
        day = day < 10 ? `0${day}` : day;
        var month = newDate.getMonth() + 1;
        month = month < 10 ? `0${month}` : month;
        var year = newDate.getFullYear();
        return `${day}/${month}/${year}`;
        // return year + "-" + month + "-" + day;
      }
    },
    formatCurrency(data) {
      if (data) {
        return Intl.NumberFormat("vi", {
          style: "currency",
          currency: "VND",
        }).format(data);
      }
    },
    formatGender(val) {
      var rs = "";
      switch (val) {
        case 0:
          rs = "Nữ";
          break;
        case 1:
          rs = "Nam";
          break;
        default:
          rs = "Chưa xác định";
          break;
      }
      return rs;
    },
  },
};
</script>

<style>
</style>