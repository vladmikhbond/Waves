##Среда распространиия волн

Средой распространия волн является плоская прямоугольная сетка.
В узлах сетки находятся массивные точки, которые могут отклоняться от состояния равновесия в направлении нормали к плоскости сетки.

Отклонение происходит за счет воздействия соседних точек. Каждая точка воздействует только на 
своих соседей, коих 4 для внутренних точек сетки, 3 - для граничных и 2 для четырех угловых точек.
Сила воздействия определяется по закону упругой деформации
f = -K * Σ xi, где xi - разница положений данной и соседней точки.
xi может быть как положительным, так и отрицательным.
Ускорение точки определяется по формуле
a = f/m = -К/m * Σ xi
Скорость и положение точек рассчиытваются путем численного решения системы 
такх дифференциальных уравнений - по одному для каждой точки.
Как видно, решение зависит не от m и К, а от их отношения K/m = km.

Чем меньше km, тем слабее воздействие соседних точек, и тем меньше скорость распространия волн.
Чем больше km, тем быстрее распространяются волны.
Но отношение К/m имеет некоторый предел, при котором поведение модели становится нефизичным.












 

 

