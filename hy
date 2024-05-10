import dash

from app_configuration import app
from app_plot import *

from history_data import *
import random
import base64
import time
from os.path import exists
from os import makedirs



# 回调，用于更新web页面数据
# dash框架是前后端不分离的，所以仅仅适用于简单页面部署，复杂页面不推荐使用dash
def app_callback_function():

    # 页面访问频率排名
    @app.callback(
        dash.dependencies.Output('graph_website_count_rank', 'figure'),
        [
            dash.dependencies.Input('input_website_count_rank', 'value'),
            dash.dependencies.Input('store_memory_history_data', 'data')
        ]
    )
    def update(value, store_memory_history_data):

        # 正确获取到历史记录文件
        if store_memory_history_data:
            history_data = store_memory_history_data['history_data']
            figure = plot_bar_website_count_rank(value, history_data)
            return figure
        else:
            # 取消更新页面数据
            raise dash.exceptions.PreventUpdate("cancel the callback")



