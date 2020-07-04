# date_time_component_demo
微信小程序自定义时间选择器（包含日期和时间）

在微信小程序的开发过程中，我们有时候会使用到日期时间的选择，但是目前微信小程序官方的picker中只有日期选择和时间选择，这两种mode是分开的，不能满足我们需要的条件，所以我花了一些时间来自定义了一个日期时间选择器。
它实现了日期时间的选中，通过format来定义时间的格式，'YYYY-MM-DD hh:mm'代表选择器可选择年月日时分，'YYYY-MM-DD hh:mm:ss'则代表选择器可选择年月日时分秒；通过mode来区分传入的时间参数类型，'time'代表传入的时间参数为时间字符串类型（例如'2020-07-04 08:30:00'），'date'代表传入的时间参数为Date类型（例如 new Date('2020-07-04 08:30:00')）;text和placeholder则用来显示picker的显示值以及显示值为空的默认值；最后可通过style来设置选择器的显示样式。


- 年月日时分选择器

![](https://upload-images.jianshu.io/upload_images/23687863-5fb49a6fd0d14e2b.png)

- 年月日时分秒选择器

![](https://upload-images.jianshu.io/upload_images/23687863-8b0b7af00f11230a.png)
