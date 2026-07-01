from django.shortcuts import render
from portfolio_app.models import projects
from contact_app.forms import ContactForm

def home(request):
    past_clients=projects.objects.filter(status=True)
    context={'projects':past_clients}
    return render(request,'home.html',context)

def contact(request):
    if request.method == 'POST':
        form = ContactForm(request.POST)
        if form.is_valid():
            name=request.POST.get('name')
            subject=request.POST.get('subject')
            age=request.POST.get('age')
    else:
        form = ContactForm()

    return render(request, 'contact.html', {'form': form})