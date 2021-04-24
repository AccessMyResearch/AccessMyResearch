<template>
<div>
    <!-- <P>This will be the Account page</P> -->
      <div class="card card-fluid">
        <!-- .card-body -->
        <div class="card-body">
        <!-- form -->
        <form method="post">
            <!-- form row -->
            <div class="form-row">
                <!-- form column -->
                <div class="col-md-6 mb-3">
                    <label for="input01">First Name</label>
                    <input type="text" class="form-control" id="input01" value="jones" required="">
                </div>
                <!-- /form column -->
                <!-- form column -->
                <div class="col-md-6 mb-3">
                    <label for="input02">Last Name</label>
                    <input type="text" class="form-control" id="input02" value="Jesse" required="">
                </div>
            <!-- /form column -->
            </div>
            <!-- /form row -->
            <!-- .form-group -->
            <div class="form-group">
                <label for="input03">Email</label>
                <input type="email" class="form-control" id="input03" value="jne0@accessmyresearch.org" required="">
            </div>
            <!-- /.form-group -->
            <!-- .form-group -->
            <div class="form-group">
                <label for="input04">New Password</label>
                <input type="password" class="form-control" id="input04" value="secret" required="">
            </div>
            <!-- /.form-group -->
            <!-- .form-group -->
            <div class="form-group">
                <label for="input05">Username</label>
                <input type="text" class="form-control" id="input05" value="Jesse_jone2" required="">
            </div>
            <!-- /.form-group -->
            <hr>
            <!-- .form-actions -->
            <div class="form-actions">
                <!-- enable submit btn when user type their current password -->
                <input type="password" class="form-control ml-auto mr-3" id="input06" placeholder="Enter Current Password" required="">
                <button type="submit" class="btn btn-primary" disabled>Save</button>
            </div>
        <!-- /.form-actions -->
        </form>
        <!-- /form -->
        </div>
    <!-- /.card-body -->
    </div>
<!-- /.card -->
</div>
</template>