<script>
    new Vue({
        el: "#app",

        mounted(){
            //当页面加载完成后，发送异步请求，获取数据

            this.selectAll();

        },

        methods: {

            // 查询分页数据
            selectAll(){

                axios({
                    method:"post",
                    url:"http://localhost:8080/brand-case/brand/selectByPageAndCondition?currentPage="+this.currentPage+"&pageSize="+this.pageSize,
                    data:this.brand
                }).then(resp =>{
                    //设置表格数据
                    this.tableData = resp.data.rows; // {rows:[],totalCount:100}
                    //设置总记录数
                    this.totalCount = resp.data.totalCount;
                })


            },

            tableRowClassName({row, rowIndex}) {
                if (rowIndex === 1) {
                    return 'warning-row';
                } else if (rowIndex === 3) {
                    return 'success-row';
                }
                return '';
            },
            // 复选框选中后执行的方法
            handleSelectionChange(val) {
                this.multipleSelection = val;

            },
            // 查询方法
            onSubmit() {
                this.selectAll();

            },
            // 添加数据
            addBrand() {
                var _this = this;

                // 发送ajax请求，添加数据
                axios({
                    method:"post",
                    url:"http://localhost:8080/brand-case/brand/add",
                    data:_this.brand
                }).then(function (resp) {
                    if(resp.data == "success"){
                        //添加成功

                        //关闭窗口
                        _this.dialogVisible = false;

                        // 重新查询数据
                        _this.selectAll();
                        // 弹出消息提示
                        _this.$message({
                            message: '恭喜你，添加成功',
                            type: 'success'
                        });

                    }
                })


            },
