<template>
  <div class="m-content">
    <div class="m-title">
      <span>Nhân viên</span>
      <button id="btn-add" @click="btnAddOnClick()" class="m-btn m-btn-add">
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
            <button class="m-btn m-btn-icon m-btn-refresh" id="btnRefresh">
              <i class="fas fa-redo"></i>
            </button>
          </div>
        </div>
      </div>
      <div>
        <table class="m-table" style="" id="tblEmployee">
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
                thẻ thành viên
              </th>

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
                  employee.DateOfBirth | formatDateOfBirth(employee.DateOfBirth)
                }}
              </td>
              <td>{{ employee.PhoneNumber }}</td>
              <td>{{ employee.Email }}</td>
              <td>{{ employee.Address }}</td>
              <!-- <td>
                {{ employee.Salary | formatCurrency(employee.Salary) }}
              </td> -->
              <td>{{ employee.DepartmentName }}</td>
              <td>
                <span @click="btnEditOnClick(employee.EmployeeId)">Sửa</span>

                <button
                  class="m-btn-icon down-data-row"
                  @click="showListRowTable(employee.EmployeeId)"
                >
                  <i class="fas fa-sort-down"></i>
                </button>

                <div class="data-list-row" :id="employee.EmployeeId">
                  <div class="data-items">
                    <div class="data-item">Nhân bản</div>
                    <div
                      @click="btnDeleteOnClick(employee.EmployeeId)"
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
    <div class="m-navigation">
      <div class="m-paging-left">
        <div class="m-paging-text-left">Tổng số: <b>1035</b> bản ghi</div>
      </div>
      <div class="m-paging-center">
        <div class="scombobox">
          <input type="text" id="" class="m-combobox-input" />
          <button class="m-combobox-buton">
            <i class="fas fa-sort-down"></i>
          </button>
          <!-- <div class="m-combobox-data">
                            <div class="m-combobox-item" value="1">Hiện thị 10 trang</div>
                            <div class="m-combobox-item" value="0">Hiện thị 20 trang</div>
                            <div class="m-combobox-item" value="0">Hiện thị 30 trang</div>
                            <div class="m-combobox-item" value="0">Hiện thị 40 trang</div>
                        </div> -->
        </div>
        <button class="m-btn-paging m-btn-paging-First">Trước</button>
        <div class="m-paging-number">
          <div class="m-page-item">1</div>
          <div class="m-page-item">2</div>
          <div class="m-page-item">3</div>
          <div class="m-page-item">...</div>
          <div class="m-page-item">6</div>
        </div>
        <button class="m-btn-paging m-btn-paging-Next">Sau</button>
      </div>
    </div>
    <EmployeeDetail
      :isShow="isShowDialogDetail"
      @showDialog="showDialogParent"
      @loadData="loadData"
      :employee="employee"
      @save="btnSaveOnClick"
    />
  </div>
  <!-- :EmployeeId="employeeId"
      
      @save="btnSaveOnClick" -->
</template>

<script>
import EmployeeDetail from "./EmployeeDetail.vue";
import axios from "axios";
import $ from "jquery"; //tải jquery
export default {
  components: {
    EmployeeDetail,
  },
  data() {
    return {
      employees: [],
      employee: {
        BankName: "TECHCOMBANK",
        BankBranchName: "HƯNG YÊN",
        BankAccountNumber: "145889785",
        EmployeeName: "Lê ",
        DepartmentId: "",
      },
      isShowDialogDetail: false,
      EmployeeId: "",
      Department: {},
    };
  },
  created() {
    this.loadData();
  },
  methods: {
    /**
     * PHẦN NÀY THAM KHẢO CỦA NVCHIẾN
     * Hiện chức năng xóa nhân bản cho từng table
     * Author: LT Ngoc (10/12/2021)
     */
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
          //$("txtemployeecode").focus();
        })
        .catch((e) => {
          this.errors.push(e);
        });
      this.showDialogParent(true);
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
    //
    showDialogParent(isShow) {
      //
      this.isShowDialogDetail = isShow;
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
            alert("Đã sửa thành công");
            //thêm thành công thì tự động đóng form
            this.showDialogParent(false);
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
      } else {
        axios
          .post("http://amis.manhnv.net/api/v1/Employees", emp)
          .then(() => {
            alert("Đã thêm thành công");
            //thêm thành công thì tự động đóng form
            me.showDialogParent(false);
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
      }
    },
   
    /**
     * sự kiện xóa form
     */
    btnDeleteOnClick(id) {
      var me = this;
      axios
        .delete("http://amis.manhnv.net/api/v1/Employees/" + id)
        .then(() => {
          // alert("Đã xóa thành công");
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
    //sự kiện load dữ liệu
    loadData() {
      axios
        .get(`http://amis.manhnv.net/api/v1/Employees`)
        .then((res) => {
          this.employees = res.data;
          this.showDialogParent(false);
          console.log(res);
        })
        .catch((error) => console.log(error));
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