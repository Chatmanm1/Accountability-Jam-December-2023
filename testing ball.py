import pygame
import sys

pygame.init()

# Set up the screen
screen_width = 800
screen_height = 600
screen = pygame.display.set_mode((screen_width, screen_height))
pygame.display.set_caption("Move Ball Down")

# Ball properties
ball_radius = 20
ball_color = (255, 0, 0)  # Red color
ball_x = screen_width // 2
ball_y = screen_height // 2
ball_speed = 5
jump_speed = 10
is_jumping = False

# Main game loop
running = True
while running:
    screen.fill((255, 255, 255))  # Fill the screen with white

    # Draw the ball on the screen
    pygame.draw.circle(screen, ball_color, (ball_x, ball_y), ball_radius)

    for event in pygame.event.get():
        if event.type == pygame.QUIT:
            running = False

        # Check for spacebar press for jumping
        if event.type == pygame.KEYDOWN:
            if event.key == pygame.K_SPACE and not is_jumping:
                is_jumping = True

    # Simulate gravity (ball falls continuously)
    if not is_jumping:
        ball_y += ball_speed

    # Jumping mechanism
    if is_jumping:
        ball_y -= jump_speed
        jump_speed -= 1
        if jump_speed < -10:
            is_jumping = False
            jump_speed = 10

    # Keep the ball from going below Y-coordinate 300
    if ball_y + ball_radius > 300:
        ball_y = 300 - ball_radius

    pygame.display.flip()  # Update the display
    pygame.time.Clock().tick(60)  # Cap the frame rate

pygame.quit()
sys.exit()
