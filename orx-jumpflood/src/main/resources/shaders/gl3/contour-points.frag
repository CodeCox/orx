#version 330 core

uniform sampler2D tex0;
in vec2 v_texCoord0;

out vec4 o_color;

void main() {
    vec2 stepSize = 1.0 / textureSize(tex0, 0);
    float ref = step(0.5 , texture(tex0, v_texCoord0).r);
    vec4 outc = vec4(-1.0, -1.0, 0.0, 1.0);

    float contour = 0.0;
    for (int y = -1; y <= 1; ++y) {
        for (int x = -1; x <= 1; ++x) {
            float smp = step(0.5, texture(tex0, v_texCoord0 + vec2(x,y) * stepSize).r);
            if (smp != ref && ref == 1.0) {
                contour = 1.0;
            }
        }
    }

    o_color = vec4(contour, contour, contour, 1.0);
}