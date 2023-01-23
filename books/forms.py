from django import forms

class ReviewForm(forms.Form):
    review = forms.CharField(label="",
                             widget=forms.Textarea(attrs={'placeholder': 'Write your notes (only visible to you).', 'class': 'form-control shadow-none',
                                                          'id': 'reviewArea', 'rows': 4}))


class SearchForm(forms.Form):
    book_info = forms.CharField(min_length=1, strip=True, label="",
                                widget=forms.TextInput(attrs={'placeholder': 'Search a book or author', 'class': 'searchInput border'}))


class LoginForm(forms.Form):
    username = forms.CharField(min_length=2, max_length=30, strip=True, label="",
                               widget=forms.TextInput(attrs={'placeholder': 'Username'}))
    password = forms.CharField(min_length=1, label="",
                               widget=forms.PasswordInput(attrs={'placeholder': 'Password'}))


class RegisterForm(forms.Form):
    username = forms.CharField(min_length=2, max_length=30, strip=True, label="",
                               widget=forms.TextInput(attrs={'placeholder': 'Username'}))
    email = forms.EmailField(min_length=2, max_length=30, label="",
                             widget=forms.EmailInput(attrs={'placeholder': 'Email Address'}))
    password = forms.CharField(min_length=1, label="",
                               widget=forms.PasswordInput(attrs={'placeholder': 'Password'}))
    confirm_password = forms.CharField(min_length=1, label="",
                                       widget=forms.PasswordInput(attrs={'placeholder': 'Confirm Password'}))