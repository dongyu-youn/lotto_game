from django.db import models
from django.contrib.auth.models import AbstractUser
from django.core.validators import MinValueValidator, MaxValueValidator
from core.models import TimeStampedModel
from django.urls import reverse

# Create your models here.
class Project(TimeStampedModel): 
    title = models.CharField(max_length=100, null=True,  default = '', verbose_name='제목')
    desc = models.TextField(max_length=300, default = '', null=True, verbose_name='내용')
    image = models.ImageField(blank=True)
    thumnail_img = models.ImageField(upload_to="", verbose_name='썸네일 이미지')

    img_a = models.ImageField(verbose_name='이미지1', null=True, blank=True)
    img_b = models.ImageField(verbose_name='이미지2', null=True, blank=True)
    img_c = models.ImageField(verbose_name='이미지3', null=True, blank=True)
    # 필드같은 경우는 

    tag = models.CharField(max_length=40, verbose_name='태그')
    git =  models.CharField(max_length=60, verbose_name='깃허브 주소')
    views = models.PositiveIntegerField(default=0, verbose_name='조회수')   
   
    
    developer = models.CharField(max_length=200, verbose_name='개발자')

    class Meta:
        ordering = ["-created"] 
        
    @property
    def get_photo_url(self): 
      if self.thumnail_img:
          return self.thumnail_img.url 
      else:
          return "/static/images/user.jpg"

    def get_absolute_url(self):
        return reverse("project:detail", kwargs={"pk": self.pk})


    @property
    def get_photo_url_a(self):
      if self.img_a:
          return self.img_a.url
      else:     
          return None

    @property
    def get_photo_url_b(self):
      if self.img_b:    
          return self.img_b.url
      else:
          return None

    @property
    def get_photo_url_c(self):
      if self.img_c:
          return self.img_c.url
      else:
          return None 


