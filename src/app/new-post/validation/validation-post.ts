export class ValidationPost {
  constructor(
    public address: string,
    public wardId: string,
    public salaryMin: string,
    public salaryMax: string,
    public moneyType: string,
    public jobTypeId: string,
    public expiredDate: string,
    public startDate: string,
    public endDate: string,
    public companyName: string,
    public email: string,
    public phoneNumber: string,
    public title: string,
    public description: string,
    public startTime: number,
    public endTime: number,
    public categoryIds: [],
    public images: [],
  ) {}

  // Phương thức kiểm tra toàn bộ dữ liệu
  validateAllFields() {
    if (this.title?.trim() === '') {
      return {
        status: false,
        message: 'Vui lòng nhập tiêu đề',
      };
    }

    if (this.companyName === null) {
      return {
        status: false,
        message: 'Vui lòng nhập tên công ty',
      };
    }

    // email

    if (this.email === null) {
      return {
        status: false,
        message: 'Vui lòng nhập email',
      };
    }

    // phone

    if (!this.phoneNumber) {
      return {
        status: false,
        message: 'Vui lòng nhập số điện thoại',
      };
    }

    // startTime

    if (this.startTime === null) {
      return {
        status: false,
        message: 'Vui lòng nhập thời gian bắt đầu',
      };
    }

    // endTime

    if (this.endTime === null) {
      return {
        status: false,
        message: 'Vui lòng nhập thời gian kết thúc',
      };
    }

    if (this.address?.trim() === '') {
      return {
        status: false,
        message: 'Vui lòng nhập địa chỉ',
      };
    }

    if (this.description?.trim() === '') {
      return {
        status: false,
        message: 'Vui lòng nhập mô tả',
      };
    }

    if (this.wardId?.trim() === '') {
      return {
        status: false,
        message: 'Vui lòng chọn phường/xã',
      };
    }

    if (this.categoryIds?.length === 0) {
      return {
        status: false,
        message: 'Vui lòng chọn ít nhất 1 ngành nghề',
      };
    }

    if (this.description.trim() === '/$//$/') {
      return {
        status: false,
        message: 'Vui lòng nhập mô tả',
      };
    }
  }
}
