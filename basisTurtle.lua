X = 0        -- is the forward direction from the original turtle
Y = 0        -- y is the height from the original turtle
Z = 0        -- is the right direction from the original turtle
Rotation = 0 -- 0 forwards of start, each positive is 90 degrees to the right



function IncrementDirection()
    X = X + math.floor(math.cos(Rotation * math.pi / 2) + 0.5)
    Z = Z + math.floor(math.sin(Rotation * math.pi / 2) + 0.5)
end

function DecrementDirection()
    X = X - math.floor(math.cos(Rotation * math.pi / 2) + 0.5)
    Z = Z - math.floor(math.sin(Rotation * math.pi / 2) + 0.5)
end

function MineThreeBlocks()
    for i = 0, 2, 1 do
        turtle.dig()
        if turtle.forward() then
            IncrementDirection()
            turtle.digUp()
            turtle.digDown()
            return true
        end
        RowFails = RowFails + 1
        return false
    end
end

function Forward()
    if turtle.forward() then
        IncrementDirection()
        return true
    end
    return false
end

function Backward()
    if turtle.back() then
        DecrementDirection()
        return true
    end
    return false
end

function Up()
    if turtle.up() then
        Y = Y + 1
        return true
    end
    return false
end

function Down()
    if turtle.down() then
        Y = Y - 1
        return true
    end
    return false
end

function Left()
    turtle.turnLeft()
    Rotation = Rotation - 1
end

function Right()
    turtle.turnRight()
    Rotation = Rotation + 1
end

function ResetRotation()
    while Rotation ~= 0 do
        if (Rotation < 0) then
            Right()
        else
            Left()
        end
    end
end

print(turtle.getFuelLevel())
