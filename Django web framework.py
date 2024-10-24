# pip install django


# django-admin startproject blogsite
# cd blogsite


# python manage.py startapp blog


# blogsite/
# ├── blogsite/           # Project-level folder
# │   ├── __init__.py
# │   ├── asgi.py
# │   ├── settings.py
# │   ├── urls.py
# │   ├── wsgi.py
# ├── blog/               # App folder
# │   ├── migrations/
# │   ├── __init__.py
# │   ├── admin.py
# │   ├── apps.py
# │   ├── models.py
# │   ├── urls.py
# │   ├── views.py
# ├── manage.py


# settings.py
# Add the blog app to the INSTALLED_APPS list in settings.py

# INSTALLED_APPS = [
#     ...
#     'blog',
# ]


# blog/models.py

from django.db import models
from django.utils import timezone

# Post model
class Post(models.Model):
    title = models.CharField(max_length=200)
    content = models.TextField()
    created_at = models.DateTimeField(default=timezone.now)

    def __str__(self):
        return self.title

# Comment model
class Comment(models.Model):
    post = models.ForeignKey(Post, related_name='comments', on_delete=models.CASCADE)
    name = models.CharField(max_length=100)
    email = models.EmailField()
    body = models.TextField()
    created_at = models.DateTimeField(default=timezone.now)

    def __str__(self):
        return f"Comment by {self.name} on {self.post}"


# To create the database tables for the models, run the following commands:


# python manage.py makemigrations
# python manage.py migrate


# blog/admin.py

from django.contrib import admin
from .models import Post, Comment

# Register the Post model
class PostAdmin(admin.ModelAdmin):
    list_display = ('title', 'created_at')

admin.site.register(Post, PostAdmin)

# Register the Comment model
class CommentAdmin(admin.ModelAdmin):
    list_display = ('name', 'email', 'post', 'created_at')

admin.site.register(Comment, CommentAdmin)


# blog/urls.py
# Create a urls.py file in the blog app to define the URL patterns for the blog.

from django.urls import path
from . import views

urlpatterns = [
    path('', views.post_list, name='post_list'),       # List all posts
    path('post/<int:id>/', views.post_detail, name='post_detail'),  # Post details
    path('post/new/', views.new_post, name='new_post'), # Create a new post
]


# blogsite/urls.py

from django.contrib import admin
from django.urls import path, include

urlpatterns = [
    path('admin/', admin.site.urls),
    path('', include('blog.urls')),  # Include the blog app's URLs
]


# blog/views.py



from django.shortcuts import render, get_object_or_404, redirect
from .models import Post, Comment
from .forms import PostForm, CommentForm

# View to list all posts
def post_list(request):
    posts = Post.objects.all().order_by('-created_at')
    return render(request, 'blog/post_list.html', {'posts': posts})

# View to show a single post
def post_detail(request, id):
    post = get_object_or_404(Post, id=id)
    comments = post.comments.all()
    if request.method == 'POST':
        comment_form = CommentForm(request.POST)
        if comment_form.is_valid():
            new_comment = comment_form.save(commit=False)
            new_comment.post = post
            new_comment.save()
            return redirect('post_detail', id=post.id)
    else:
        comment_form = CommentForm()
    return render(request, 'blog/post_detail.html', {
        'post': post,
        'comments': comments,
        'comment_form': comment_form
    })

# View to create a new post
def new_post(request):
    if request.method == 'POST':
        form = PostForm(request.POST)
        if form.is_valid():
            form.save()
            return redirect('post_list')
    else:
        form = PostForm()
    return render(request, 'blog/new_post.html', {'form': form})



# blog/forms.py

from django import forms
from .models import Post, Comment

# Form for creating a new blog post
class PostForm(forms.ModelForm):
    class Meta:
        model = Post
        fields = ['title', 'content']

# Form for submitting a new comment
class CommentForm(forms.ModelForm):
    class Meta:
        model = Comment
        fields = ['name', 'email', 'body']



# blog/templates/blog/

# post_list.html


# <h1>Blog Posts</h1>
# <a href="{% url 'new_post' %}">Create New Post</a>
# <ul>
#     {% for post in posts %}
#         <li>
#             <a href="{% url 'post_detail' post.id %}">{{ post.title }}</a>
#             <p>{{ post.created_at }}</p>
#         </li>
#     {% endfor %}
# </ul>


# post_detail.html

# <h1>{{ post.title }}</h1>
# <p>{{ post.content }}</p>
# <p>Posted on: {{ post.created_at }}</p>

# <h3>Comments</h3>
# <ul>
#     {% for comment in comments %}
#         <li>{{ comment.name }}: {{ comment.body }}</li>
#     {% endfor %}
# </ul>

# <h3>Add a comment:</h3>
# <form method="POST">
#     {% csrf_token %}
#     {{ comment_form.as_p }}
#     <button type="submit">Submit</button>
# </form>



# new_post.html


# <h1>Create a New Post</h1>
# <form method="POST">
#     {% csrf_token %}
#     {{ form.as_p }}
#     <button type="submit">Create Post</button>
# </form>


# python manage.py createsuperuser
# python manage.py runserver
# http://127.0.0.1:8000/