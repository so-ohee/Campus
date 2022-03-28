# This is an auto-generated Django model module.
# You'll have to do the following manually to clean this up:
#   * Rearrange models' order
#   * Make sure each model has one field with primary_key=True
#   * Make sure each ForeignKey and OneToOneField has `on_delete` set to the desired behavior
#   * Remove `managed = False` lines if you wish to allow Django to create, modify, and delete the table
# Feel free to rename the models, but don't rename db_table values or field names.
from django.db import models


class AuthGroup(models.Model):
    name = models.CharField(unique=True, max_length=150)

    class Meta:
        managed = False
        db_table = 'auth_group'


class AuthGroupPermissions(models.Model):
    id = models.BigAutoField(primary_key=True)
    group = models.ForeignKey(AuthGroup, models.DO_NOTHING)
    permission = models.ForeignKey('AuthPermission', models.DO_NOTHING)

    class Meta:
        managed = False
        db_table = 'auth_group_permissions'
        unique_together = (('group', 'permission'),)


class AuthPermission(models.Model):
    name = models.CharField(max_length=255)
    content_type = models.ForeignKey('DjangoContentType', models.DO_NOTHING)
    codename = models.CharField(max_length=100)

    class Meta:
        managed = False
        db_table = 'auth_permission'
        unique_together = (('content_type', 'codename'),)


class AuthUser(models.Model):
    password = models.CharField(max_length=128)
    last_login = models.DateTimeField(blank=True, null=True)
    is_superuser = models.IntegerField()
    username = models.CharField(unique=True, max_length=150)
    first_name = models.CharField(max_length=150)
    last_name = models.CharField(max_length=150)
    email = models.CharField(max_length=254)
    is_staff = models.IntegerField()
    is_active = models.IntegerField()
    date_joined = models.DateTimeField()

    class Meta:
        managed = False
        db_table = 'auth_user'


class AuthUserGroups(models.Model):
    id = models.BigAutoField(primary_key=True)
    user = models.ForeignKey(AuthUser, models.DO_NOTHING)
    group = models.ForeignKey(AuthGroup, models.DO_NOTHING)

    class Meta:
        managed = False
        db_table = 'auth_user_groups'
        unique_together = (('user', 'group'),)


class AuthUserUserPermissions(models.Model):
    id = models.BigAutoField(primary_key=True)
    user = models.ForeignKey(AuthUser, models.DO_NOTHING)
    permission = models.ForeignKey(AuthPermission, models.DO_NOTHING)

    class Meta:
        managed = False
        db_table = 'auth_user_user_permissions'
        unique_together = (('user', 'permission'),)


class Board(models.Model):
    board_id = models.AutoField(primary_key=True)
    category = models.CharField(max_length=45)
    user_uid = models.ForeignKey('User', models.DO_NOTHING, db_column='user_uid')
    camping = models.ForeignKey('Camping', models.DO_NOTHING, blank=True, null=True)
    title = models.CharField(max_length=45)
    content = models.TextField()
    create_time = models.DateTimeField()
    update_time = models.DateTimeField(blank=True, null=True)
    delete_state = models.IntegerField()
    hit = models.IntegerField()

    class Meta:
        managed = False
        db_table = 'board'


class Bookmark(models.Model):
    bookmark_id = models.AutoField(primary_key=True)
    user_uid = models.ForeignKey('User', models.DO_NOTHING, db_column='user_uid')
    camping = models.ForeignKey('Camping', models.DO_NOTHING)

    class Meta:
        managed = False
        db_table = 'bookmark'


class Camping(models.Model):
    camping_id = models.BigIntegerField(primary_key=True)
    faclt_nm = models.TextField(blank=True, null=True)
    line_intro = models.TextField(blank=True, null=True)
    intro = models.TextField(blank=True, null=True)
    manage_status = models.TextField(blank=True, null=True)
    hvof_bgnde = models.TextField(blank=True, null=True)
    hvof_enddle = models.TextField(blank=True, null=True)
    induty = models.TextField(blank=True, null=True)
    lct_cl = models.TextField(blank=True, null=True)
    do_nm = models.TextField(blank=True, null=True)
    sigungu_nm = models.TextField(blank=True, null=True)
    addr1 = models.TextField(blank=True, null=True)
    addr2 = models.TextField(blank=True, null=True)
    map_x = models.FloatField(blank=True, null=True)
    map_y = models.FloatField(blank=True, null=True)
    direction = models.TextField(blank=True, null=True)
    tel = models.TextField(blank=True, null=True)
    homepage = models.TextField(blank=True, null=True)
    resve_url = models.TextField(blank=True, null=True)
    resve_cl = models.TextField(blank=True, null=True)
    gnrl_site_co = models.BigIntegerField(blank=True, null=True)
    auto_site_co = models.BigIntegerField(blank=True, null=True)
    glamp_site_co = models.BigIntegerField(blank=True, null=True)
    carav_site_co = models.BigIntegerField(blank=True, null=True)
    indvdl_carav_site_co = models.BigIntegerField(blank=True, null=True)
    sited_stnc = models.BigIntegerField(blank=True, null=True)
    site_mg1_width = models.BigIntegerField(blank=True, null=True)
    site_mg2_width = models.BigIntegerField(blank=True, null=True)
    site_mg3_width = models.BigIntegerField(blank=True, null=True)
    site_mg1_vrticl = models.BigIntegerField(blank=True, null=True)
    site_mg2_vrticl = models.BigIntegerField(blank=True, null=True)
    site_mg3_vrticl = models.BigIntegerField(blank=True, null=True)
    site_mg1_co = models.BigIntegerField(blank=True, null=True)
    site_mg2_co = models.BigIntegerField(blank=True, null=True)
    site_mg3_co = models.BigIntegerField(blank=True, null=True)
    site_bottom_cl1 = models.BigIntegerField(blank=True, null=True)
    site_bottom_cl2 = models.BigIntegerField(blank=True, null=True)
    site_bottom_cl3 = models.BigIntegerField(blank=True, null=True)
    site_bottom_cl4 = models.BigIntegerField(blank=True, null=True)
    site_bottom_cl5 = models.BigIntegerField(blank=True, null=True)
    glamp_inner_fclty = models.TextField(blank=True, null=True)
    carav_inner_fclty = models.TextField(blank=True, null=True)
    oper_pd_cl = models.TextField(blank=True, null=True)
    oper_de_cl = models.TextField(blank=True, null=True)
    trler_acmpny_at = models.TextField(blank=True, null=True)
    carav_acmpny_at = models.TextField(blank=True, null=True)
    toilet_co = models.BigIntegerField(blank=True, null=True)
    swrm_co = models.BigIntegerField(blank=True, null=True)
    wtrpl_co = models.BigIntegerField(blank=True, null=True)
    brazier_cl = models.TextField(blank=True, null=True)
    sbrs_cl = models.TextField(blank=True, null=True)
    sbrs_etc = models.TextField(blank=True, null=True)
    posbl_fclty_cl = models.TextField(blank=True, null=True)
    posbl_fclty_etc = models.TextField(blank=True, null=True)
    thema_envrn_cl = models.TextField(blank=True, null=True)
    eqpmn_lend_cl = models.TextField(blank=True, null=True)
    animal_cmg_cl = models.TextField(blank=True, null=True)
    first_image_url = models.TextField(blank=True, null=True)
    blog_cnt = models.BigIntegerField(blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'camping'


class Comment(models.Model):
    comment_id = models.AutoField(primary_key=True)
    user_uid = models.ForeignKey('User', models.DO_NOTHING, db_column='user_uid')
    board = models.ForeignKey(Board, models.DO_NOTHING)
    comment = models.CharField(max_length=400)
    create_time = models.DateTimeField()
    update_time = models.DateTimeField(blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'comment'


class DjangoAdminLog(models.Model):
    action_time = models.DateTimeField()
    object_id = models.TextField(blank=True, null=True)
    object_repr = models.CharField(max_length=200)
    action_flag = models.PositiveSmallIntegerField()
    change_message = models.TextField()
    content_type = models.ForeignKey('DjangoContentType', models.DO_NOTHING, blank=True, null=True)
    user = models.ForeignKey(AuthUser, models.DO_NOTHING)

    class Meta:
        managed = False
        db_table = 'django_admin_log'


class DjangoContentType(models.Model):
    app_label = models.CharField(max_length=100)
    model = models.CharField(max_length=100)

    class Meta:
        managed = False
        db_table = 'django_content_type'
        unique_together = (('app_label', 'model'),)


class DjangoMigrations(models.Model):
    id = models.BigAutoField(primary_key=True)
    app = models.CharField(max_length=255)
    name = models.CharField(max_length=255)
    applied = models.DateTimeField()

    class Meta:
        managed = False
        db_table = 'django_migrations'


class DjangoSession(models.Model):
    session_key = models.CharField(primary_key=True, max_length=40)
    session_data = models.TextField()
    expire_date = models.DateTimeField()

    class Meta:
        managed = False
        db_table = 'django_session'


class FileBoard(models.Model):
    file_id = models.AutoField(primary_key=True)
    board = models.ForeignKey(Board, models.DO_NOTHING)
    file_path = models.CharField(max_length=200, blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'file_board'


class FileCamping(models.Model):
    file_id = models.IntegerField(primary_key=True)
    camping = models.ForeignKey(Camping, models.DO_NOTHING)
    file_path = models.CharField(max_length=200, blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'file_camping'


class Rating(models.Model):
    rating_id = models.AutoField(primary_key=True)
    board = models.ForeignKey(Board, models.DO_NOTHING)
    environment = models.IntegerField()
    facility = models.IntegerField()
    service = models.CharField(max_length=45)

    class Meta:
        managed = False
        db_table = 'rating'


class Survey(models.Model):
    user_uid = models.OneToOneField('User', models.DO_NOTHING, db_column='user_uid', primary_key=True)
    q1_equipment = models.IntegerField()
    q2_distance = models.IntegerField()
    q3_environment = models.CharField(max_length=10)
    q4_pet = models.IntegerField()
    user_x = models.FloatField()
    user_y = models.FloatField()

    class Meta:
        managed = False
        db_table = 'survey'


class User(models.Model):
    user_uid = models.CharField(primary_key=True, max_length=45)
    name = models.CharField(max_length=45)
    profile = models.CharField(max_length=200, blank=True, null=True)
    user_state = models.IntegerField()

    class Meta:
        managed = False
        db_table = 'user'


class ViewLog(models.Model):
    view_id = models.AutoField(primary_key=True)
    user_uid = models.ForeignKey(User, models.DO_NOTHING, db_column='user_uid')
    camping = models.ForeignKey(Camping, models.DO_NOTHING)

    class Meta:
        managed = False
        db_table = 'view_log'


class Visit(models.Model):
    visit_id = models.AutoField(primary_key=True)
    user_uid = models.ForeignKey(User, models.DO_NOTHING, db_column='user_uid')
    camping = models.ForeignKey(Camping, models.DO_NOTHING)

    class Meta:
        managed = False
        db_table = 'visit'
