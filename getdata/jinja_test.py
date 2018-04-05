from jinja2 import Environment, FileSystemLoader, select_autoescape


class Indicator:
    domain = str()
    column = int()


ind = Indicator
ind.domain = 'census_tract'
ind.column = 'pop_100'


env = Environment(
    loader=FileSystemLoader('./template_models.py.jinja'),
    autoescape=select_autoescape(['html', 'xml'])
)

modelTemplate = env.get_template('template_models.py.jinja')

print(modelTemplate.render(dataset_name='Population', indicator=ind))
