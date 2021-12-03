<template>
  <div class="m-content">
    <div class="m-title">
      <span>Nhân viên</span>
      <button id="btn-add" class="m-btn m-btn-add">Thêm mới nhân viên</button>
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
      <div >
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
            <th fieldName="DepartmentName">Tiền nợ</th>
            <th fieldName="Salary" formatType="money" class="m-text-right">
              thẻ thành viên
            </th>

            <th>Chức năng</th>
          </tr>
        </thead>
        <tbody >
          <tr v-for="customer in customers" :key="customer.customerId">
            <td>
              <input type="checkbox" name="" id="" />
            </td>
            <td>{{ customer.CustomerCode }}</td>
            <td>{{ customer.FullName }}</td>
            <td>{{ customer.Gender | formatGender(customer.Gender) }}</td>
            <td>
              {{
                customer.DateOfBirth | formatDateOfBirth(customer.DateOfBirth)
              }}
            </td>
            <td>{{ customer.PhoneNumber }}</td>
            <td>{{ customer.Email }}</td>
            <td>{{ customer.Address }}</td>
            <td>
              {{ customer.DebitAmount | formatCurrency(customer.DebitAmount) }}
            </td>
            <td>{{customer.MemberCardCode}}</td>
            <td>
              <span>Sửa</span>

              <button class="">
                <i class="fas fa-sort-down"></i>
              </button>
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
  </div>
</template>

<script>
import axios from "axios";
export default {
  data() {
    return {
      customers: [],
    };
  },
  created() {
    axios
      .get(`http://cukcuk.manhnv.net/api/v1/Customerss`)
      .then((res) => {
        this.customers = res.data;
        console.log(res);
      })
      .catch((error) => console.log(error));
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
    formatGender(val){
            var rs = '';
            switch (val) {
                case 0:
                    rs = 'Nữ';
                    break;
                case 1:
                    rs = 'Nam';
                    break;
                default:
                     rs = 'Chưa xác định';
                    break;
            }
            return rs;
        },
  },
};
</script>

<style>
@import url("../../assets/fonts/fontawesome-5.15.1/css/all.min.css");
@import url("../../style/main.css");
</style>